const { sequelize } = require("../config/sequelize.config");
//const db = require("../config/db");
const { Op } = require("sequelize");
const { ProductModel, ProductView, ProductsInventaryView } = require("../models/product.model");

const { ProductPhotosModel } = require("../models/product.photos.model");

const { BrandModel, BrandViewModel } = require("../models/brand.model");
const {
  CreateAction,
  UpdateAction,
  DeleteAction,
  RetriveAction,
} = require("../services/LogService");

const{ generalFiltersParams } = require('../commons/general.filters.params');

exports.Create = async (body) => {
  const { sku, name, brand_id, active, user_id } = body;

  let results = await ProductModel.findOne({
    where: {
      sku: sku,
    },
  });

  const transaction = await sequelize.transaction();

  try {
    if (results) throw Error(`Product sku '${sku}' already exists.`);

    let brand_list = await BrandViewModel.findByPk(brand_id);

    if (!brand_list) throw Error(`Brand ${brand_id} not exists.`);

    /*
  if(brand_list.active)
    throw Error(`Brand ${brand_id} not active.`);
  */

    let target = {
      sku: sku,
      name: name,
      brand_id: brand_id,
      active: active,
      user_id: user_id,
    };

    var product_create = await ProductModel.create(target, { transaction });

    //console.log(body);
    //images
    if (body.files) {
      for (let photo of body.files) {
        await ProductPhotosModel.create(
          {
            product_id: product_create.id,
            photo_path: photo.path,
            user_id: user_id,
          },
          { transaction }
        );
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
  //const { sku, name, brand_id, active, filter_by, start_date, end_date } = body;
  let parameters = generalFiltersParams(body);

  const { id, sku, name, brand_id } = body;

  if(id) parameters.push({id: id});
  if (sku) parameters.push({ sku: { [Op.like]: `%${sku}%` } });
  if (name) parameters.push({ name: { [Op.like]: `%${name}%` } });
  if (brand_id) parameters.push({ brand_id: brand_id });

  const results = await ProductsInventaryView.findAll({
    where: parameters,
    include: [
      {
        model: ProductPhotosModel,
        as: "photos",
      },
    ],
  });

  return results;
};

exports.Update = async (body, params) => {
  const { id } = params;
  const { sku, name, brand_id, active, user_id } = body;

  let preExists = await ProductView.findOne({
    where: {
      sku: sku,
      id: {
        [Op.ne]: id,
      },
    },
  });

  if (preExists)
    throw Error(
      `The brand cannot be updated because the sku '${sku}' already exists.`
    );

  const product = await ProductModel.findByPk(id);

  if (!product) throw Error(`The product ${id} not found.`);

  let changes = {
    tableName: "products",
    changes: [
      {
        columnName: "sku",
        previus: product.sku,
        current: sku,
      },
      {
        columnName: "name",
        previus: product.name,
        current: name,
      },
      {
        columnName: "active",
        previus: product.active,
        current: active,
      },
      {
        columnName: "user_id",
        previus: product.user_id,
        current: user_id,
      },
    ],
  };

  product.name = name ?? product.name;
  product.sku = sku ?? product.sku;
  product.active = (active == true)? 1 : 0;
  product.update_at = Date.now();
  product.user_id = user_id;
  product.brand_id = brand_id ?? product.brand_id;

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
    tableName: "products",
    changes: [
      {
        columnName: delete_at,
        previus: null,
        current: delete_at,
      },
      {
        columnName: user_id,
        previus: product.user_id,
        current: params.user_id,
      },
    ],
  };

  product.delete_at = delete_at;
  product.user_id = params.user_id;

  await product.save();

  await DeleteAction(changes, user_id, "PRODUCTS");

};

exports.ById = async (body) => {
  const { id, user_id} = body;
  const logMesage = {
    user_id : user_id,
    METRHOD: 'REGRIVE'
  }
  await RetriveAction(logMesage, user_id, 'PRODUCT');
  return await ProductsInventaryView.findAll({ where: {id : id} });
};

exports.ChangeStatusActive = async (params) => {
  const { id, active, user_id } = params;

  let preExists = await ProductView.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The product ${id} not found.`);
  }

  if(preExists.active == active ){
    throw Error(`The product ${id} is ${active?'activated':'deactivated'}!`);
  }

  let product = await ProductModel.findByPk(id);

  product.update_at = Date.now();
  product.active = (active == 'true')?1:0;
  product.user_id = user_id;

  await product.save();
}
