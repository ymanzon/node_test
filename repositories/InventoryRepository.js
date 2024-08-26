const { Op } = require("sequelize");
const { sequelize } = require("../config/sequelize.config");
const {
  StockTransactionsModel,
  StockTransactionsView,
} = require("../models/stock.transaction.model");
const { InventoryModel, InventoryView } = require("../models/inventory.model");
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
    let inventary = await InventoryModel.findOne({
      where: {
        product_id: product_id,
      },
    });

    let movement = {
      product_id: product_id,
      quantity: quantity,
      type_move: type_move,
      processed: true,
      user_id: user_id,
    };

    await StockTransactionsModel.create(movement, { transaction });

    //si no existe, se crea el inventario cualesquiera el tipo de movimiento
    if (!inventary) {
      await InventoryModel.create(
        {
          product_id: product_id,
          quantity: quantity,
          active: true,
          user_id: user_id,
        },
        { transaction }
      );
    } else {
      switch (type_move) {
        case "IN":
          //console.log(inventary);

          inventary.quantity += Number( quantity );
          inventary.user_id = user_id;
          inventary.update_at = Date.now();
          
          await inventary.save({ transaction });
          break;
        case "OUT":
          //console.log(inventary);

          if (!inventary.allow_negative && inventary.quantity - quantity < 0)
            throw Error(
              `Product inentary for product ${inventary.product_id} not allow negative quantity`
            );

          inventary.quantity -= Number( quantity );
          inventary.user_id = user_id;
          inventary.update_at = Date.now();
          
          await inventary.save({ transaction });
          break;
        case "ADJ":
          inventary.quantity = Number( quantity );
          inventary.user_id = user_id;
          inventary.update_at = Date.now();
          await inventary.save({ transaction });
          break;
        default:
          throw Error(` Move type not found ${type_move} in the list`);
      }
    }

    console.log(body);
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
    brand_name,
    create_at,
    start_create_at,
    end_create_at,
    user_id,
  } = body;

  let parameters = [];
  if (product_id) parameters.push({ product_id: product_id });
  if (quantity) parameters.push({ quantity: quantity });
  if (active) parameters.push({ active: active });
  if (sku) parameters.push({ sku: { [Op.like]: `%${sku}%` } });
  if (product_name) parameters.push({ product_name: { [Op.like]: `%${product_name}%` } });
  if (brand_name) parameters.push({ brand_name: { [Op.like]: `%${brand_name}%` } });

  if (create_at) {
    let create_at_start = new Date(create_at);
    let create_at_end = new Date(create_at);

    create_at_end.setDate(create_at_start.getDate() + 1);

    parameters.push({ create_at: { [Op.gte]: create_at_start } });
    parameters.push({ create_at: { [Op.lte]: create_at_end } });
  }

  if (start_create_at) {
    //<= gte
    let create_at_start = new Date(start_create_at);

    parameters.push({ create_at: { [Op.gte]: create_at_start } });
  }
  if (end_create_at) {
    //>= lte
    let create_at_end = new Date(end_create_at);

    parameters.push({ create_at: { [Op.lte]: create_at_end } });
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
    brand_name,
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
  if(brand_name) parameters.push( {brand_name:{[Op.like] : `%${brand_name}%`}} );
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