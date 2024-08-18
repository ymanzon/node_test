//const { Op } = require("sequelize");
const {sequelize} = require("../config/sequelize.config");
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

    await StockTransactionsModel.create( movement , { transaction });

    

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
          inventary.quantity = inventary.quantity + quantity;
          inventary.user_id = user_id;
          inventary.update_at = Date.now();
          await inventary.save({ transaction });
          break;
        case "OUT":
          if (!inventary.allow_negative && inventary.quantity - quantity < 0)
            throw Error(
              `Product inentary for product ${inventary.product_id} not allow negative quantity`
            );

          inventary.quantity = inventary.quantity - quantity;
          inventary.user_id = user_id;
          inventary.update_at = Date.now();
          await inventary.save({ transaction });
          break;
        case "ADJ":
          inventary.quantity = quantity;
          inventary.user_id = user_id;
          inventary.update_at = Date.now();
          await inventary.save({ transaction });
          break;
        default:
          throw Error(` Move type not found ${type_move} in the list`);
      }
    }

    await transaction.commit();
      console.log("COMMIT");

  } catch (error) {
    console.log("ROLLBACK");

    await transaction.rollback();
    
    throw error;
  }
};
