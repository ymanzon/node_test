const { Op } = require("sequelize");
const { sequelize } = require("../config/sequelize.config");
const {
  StockTransactionsModel,
  StockTransactionsView,
} = require("../models/stock.transaction.model");
const { InventoryView, InventoryQuantityViewModel } = require("../models/inventory.model");
const { ProductView } = require('../models/product.model');
const {
  CreateAction,
  UpdateAction,
  DeleteAction,
} = require("../services/LogService");

//const { StockTransactionsView } = require('../models/stock.transaction.model');


exports.Create = async (body) => {

  const { product_id, quantity, type_move, active, user_id } = body;

  //const transaction = await Sequelize.transaction();
  const transaction = await sequelize.transaction();

  try {
    //buscar el registro del producto en el inventario, para crear o actualizar el registro
    /*let inventary = await InventoryModel.findOne({
      where: {
        product_id: product_id,
      },
    });
    */

   //validar si es un movimiento de tipo out, se puede quedar el inventario en negativo
   //consultar el producto si no esta eliminado
   let product = await ProductView.findOne({where: {id: product_id}}); 
   if(!product)
    throw Error(`The product ${product_id} not found.`);

   var inventory_current = await InventoryQuantityViewModel.findOne({where : { product_id : product_id}});


   if(type_move == 'OUT' && (!inventory_current || inventory_current.quantity < quantity) )
    throw Error(`The stock of product ${product.name} will remain in the negative.`);

    let movement = {
      product_id: product_id,
      quantity: quantity,
      type_move: type_move,
      processed: true,
      user_id: user_id,
      active: 1
    };

    await StockTransactionsModel.create(movement, { transaction });

    await transaction.commit();
    console.log("COMMIT");
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.Retrive = async (body) => {

  const {
    product_id,
    quantity,
    active,
    sku,
    product_name,
    filter_by,
    start_date,
    end_date,
    user_id,
  } = body;

  let parameters = [];
  if (product_id) parameters.push({ product_id: product_id });
  if (quantity) parameters.push({ quantity: quantity });
  //if (active) parameters.push({ active: active });
  if (active) parameters.push({ active: active == "true" ? 1 : 0 });
  if (sku) parameters.push({ sku: { [Op.like]: `%${sku}%` } });
  if (product_name) parameters.push({ product_name: { [Op.like]: `%${product_name}%` } });

  if (filter_by) {
    const dateField = `${filter_by}`;
    
    if (start_date) 
      parameters.push({ [dateField]: { [Op.gte]: new Date(start_date) } });
    
    if (end_date) 
      parameters.push({ [dateField]: { [Op.lte]: new Date(end_date) } });
    
  }

  //se utiliza la vista para recuperar la invormacion de las marcas
  const results = await InventoryView.findAll({ where: parameters });

  return results;
};


exports.GetTransactions = async (body) => {
  const {
    id,
    sku,
    product_id,
    //quantity,
    active,
    product_name,
    brand_id,
    type_move,
    create_at,
    start_create_at,
    end_create_at,
    user_id,
  } = body;

  let parameters = [];

  if(id) parameters.push({id:id});
  if(sku) parameters.push({sku:{ [Op.like]: `%${sku}%` }});
  if(product_id) parameters.push({product_id:product_id});
  if(product_name) parameters.push({product_name: {[Op.like]: `%${product_name}%`}});
  if(brand_id) parameters.push({brand_id: brand_id});
  //if(bran//d_name) parameters.push( {brand_name:{[Op.like] : `%${brand_name}%`}} );
  if(type_move) parameters.push({ type_move: {[Op.like]: `%${type_move}%`}});
  if(active) product.push({active: active});

  if (create_at) {
    let create_at_start = new Date(create_at);
    let create_at_end = new Date(create_at);

    create_at_end.setDate(create_at_start.getDate() + 1);

    parameters.push({ create_at: { [Op.gte]: create_at_start } });
    parameters.push({ create_at: { [Op.lte]: create_at_end } });
  }

  if (start_create_at) //<= gte
  {
    let create_at_start = new Date(start_create_at);
    parameters.push({ create_at: { [Op.gte]: create_at_start } });
  }
  if (end_create_at) //>= lte
  {
    let create_at_end = new Date(end_create_at);
    parameters.push({ create_at: { [Op.lte]: create_at_end } });
  }

  //
  // 
  //
  return await StockTransactionsView.findAll({ where: parameters });
}