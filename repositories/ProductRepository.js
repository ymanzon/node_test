const {sequelize} = require("../config/sequelize.config");
//const db = require("../config/db");
const { Op } = require("sequelize");
const { ProductModel, ProductView } = require("../models/product.model");

const {ProductPhotosModel} = require('../models/product.photos.model');

const { BrandModel } = require('../models/brand.model');
const {
  CreateAction,
  UpdateAction,
  DeleteAction,
} = require("../services/LogService");

exports.Create = async (body) => {
  const { sku, name, brand_id, active, user_id } = body;

  let results = await ProductModel.findOne({
    where: {
      sku: sku,
      //name: name,
    },
  });

  const transaction = await sequelize.transaction();

  try {
    
  

  if (results)
    throw Error(`Product sku '${sku}' already exists.`);

  let brand_list =  await BrandModel.findByPk(brand_id);

  if(!brand_list)
    throw Error(`Brand ${brand_id} not exists.`);

 

  let target = {
    sku: sku,
    name: name,
    brand_id: brand_id,
    active: active,
    user_id: user_id,
  };

  var product_create = await ProductModel.create(target, {transaction});

  //console.log(body);
   //images
   if(body.files)
    {
      for (let photo of body.files) {
        await ProductPhotosModel.create({
          product_id : product_create.id,
          photo_path: photo.path,
          user_id: user_id
        }, {transaction})
      }
    }


  //falta guardar el objeto en target, marca error.
  await CreateAction(target, user_id, "PRODUCTS");

  await transaction.commit();

  } catch (error) {
    await transaction.rollback();
    throw Error(error);
  }
};

exports.Retrive = async (body) => {
  const { sku, name, brand_id, active, create_at, create_at_after, create_at_before } = body;

  let parameters = []
  if(sku) parameters.push({ sku:{[Op.like] : `%${sku}%`}  });
  if(name) parameters.push({ name:{[Op.like] : `%${name}%`} });
  if(brand_id) parameters.push({brand_id: brand_id});
  if (active) parameters.push({ active: active == "true" ? 1 : 0 });
  if (create_at) {
    let create_at_start = new Date(create_at);
    let create_at_end = new Date(create_at);

    create_at_end.setDate(create_at_start.getDate() + 1);

    console.log(create_at_start);
    console.log(create_at_end);

    parameters.push({ create_at: { [Op.gte]: create_at_start } });
    parameters.push({ create_at: { [Op.lte]: create_at_end } });
  }

  //menores que  create_at <=
  if (create_at_before)
    parameters.push({ create_at: { [Op.lte]: create_at_before } });
  //mayores que create_at >=
  if (create_at_after)
    parameters.push({ create_at: { [Op.gte]: create_at_after } });

  const results = await ProductView.findAll({ 
    where: parameters , include:[{
    model: ProductPhotosModel,
    as: 'photos',
  }]});

  return results;
};

exports.Update = async (body, params) => {
  const { id } = params;
  const { sku, name, brand_id, active, user_id } = body;

  let preExists = await ProductView.findOne({
    where :{
      sku:sku,
      id:{
        [Op.ne] :id
      }
    }
  });

  if(preExists) throw Error ( `The brand cannot be updated because the sku '${sku}' already exists.` );

  const product = await ProductModel.findByPk(id);

  if(!product)
    throw Error(`The product ${id} not found.`);

  let changes = {
    tableName : "products",
    changes:[
      {
        columnName:"sku",
        previus:product.sku,
        current:sku
      },
      {
        columnName:"name",
      previus:product.name,
      current:name
    },
    {
      columnName:"active",
      previus:product.active,
      current:active
    },
    {
      columnName:"user_id",
      previus:product.user_id,
      current:user_id
    },
    ]
  };

  
  product.name = name;
  product.sku = sku;
  product.active  = (active == true)?1:0;
  product.update_at = Date.now();
  product.user_id = user_id;

  //TODO
  await product.save();

  await UpdateAction(changes, user_id, "PRODUCTS");

};

exports.Delete = async (params) => {
  const { id, user_id } = params;

  let preExists = await ProductModel.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The product ${id} not found.`);
  }

  let product = await ProductModel.findByPk(id);

  let delete_at = Date.now();
  let changes = {
    tableName:"products",
    changes:[
      {
        columnName:delete_at,
        previus: null,
        current:delete_at
      },
      {columnName:user_id,
        previus: product.user_id,
        current : params.user_id
      }
    ]
  }

  product.delete_at = delete_at;
  product.user_id = params.user_id;

  await product.save();

  await DeleteAction(changes, user_id, "PRODUCTS");

  /*

  let query = "UPDATE products SET user_id = ? delete_at = NOW() WHERE id = ? ";

  await db.query(query, [user_id, id]);]*/
};
