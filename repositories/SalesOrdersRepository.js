const {sequelize} = require("../config/sequelize.config");
const { Op } = require("sequelize");
const { SalesOrderModel, SalesOrderModelView } = require("../models/sales.orders.model");
const { SalesOrderzDetailsModel }  = require('../models/sales.orders.details.model');
const { CustomerModelView } = require("../models/customer.model");
const { CreateAction, UpdateAction, DeleteAction }  = require ('../services/LogService');
const { ProductView } = require("../models/product.model");
const { StockTransactionsModel } = require('../models/stock.transaction.model');
const { InventoryModel } = require('../models/inventory.model');
 //const {}

exports.Create = async (body) => {
    const {legal_number, customer_id, subtotal, total, active, user_id, details } = body;

    //customer 
    let customerRows = await CustomerModelView.findOne({where : { id: customer_id }});

    if(!customerRows)
      throw Error("Customer is not valid.");

    let results = await SalesOrderModel.findOne({where : { legal_number: legal_number }});

    if(results)
        throw Error(`Legalnumber already exists ${legal_number}`);

    const transaction = await sequelize.transaction();

    try {

        let salesOrderRow = await SalesOrderModel.create({
            legal_number:legal_number,
            customer_id: customer_id,
            subtotal:subtotal,
            total:total,
            user_id: user_id
        }, {transaction});

        for (let detail of details) {
          //validate product 
          //console.log(detail.product_id);
          var productRow = await ProductView.findOne({where : { id: detail.product_id }});

          if(!productRow) throw Error("product_id not valid.");

          if(productRow.quantity <= 0) throw Error("product is out of stock");

          let target = {
            sales_orders_id : salesOrderRow.id,
            legal_number: legal_number,
            product_id: detail.product_id,
            quantity: detail.quantity,
            unit_price: detail.unit_price,
            total: detail.total,
        };
        
            await SalesOrderzDetailsModel.create({
                sales_orders_id : salesOrderRow.id,
                legal_number: legal_number,
                product_id: detail.product_id,
                quantity: detail.quantity,
                unit_price: detail.unit_price,
                total: detail.total,
            }, {transaction});

            //generate movimiento, y descuento del inventario
            let movement = {
                product_id: detail.product_id,
                quantity: detail.quantity,
                type_move: 'OUT',
                processed: true,
                user_id: user_id,
              };
          
              //generar movimiento
              await StockTransactionsModel.create( movement , { transaction });

              //validar negativo
              /*if (!inventary.allow_negative && inventary.quantity - quantity < 0)
                throw Error(
                  `Product inentary for product ${inventary.product_id} not allow negative quantity`
                );
              */

                let inventary = await InventoryModel.findOne({
                  where: {
                    product_id: detail.product_id,
                  },
                });

              inventary.quantity = inventary.quantity - detail.quantity;
              inventary.user_id = user_id;
              inventary.update_at = Date.now();
              await inventary.save({ transaction });

        };
        
        await transaction.commit();

    } catch (error) {
        console.log(error)
        await transaction.rollback();
        throw error;
    }
}

exports.Retrive = async (body) => {
    const {
        legal_number,
        customer_id,
        active,
        create_at,
        create_at_before,
        create_at_after,
        user_id,
      } = body;
    
      
      let parameters = [];
      if (legal_number) parameters.push({ legal_number: { [Op.like]: `%${legal_number}%` } });

      if (customer_id) parameters.push({ customer_id: customer_id});
      if (user_id) parameters.push({ user_id: user_id});
    
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
    
      const results = await SalesOrderModelView.findAll({ where: parameters });
    
      return results; 
}

/*
exports.Update = async (body, params) => {

}
*/

exports.Delete = async (params) => {
    const { id } = params;
  
    let preExists = await SalesOrderModel.findOne({
      where: {
        id: id,
      },
    });
  
    if (!preExists) {
      throw Error(`The sales order ${id} not found.`);
    }
  
    let salesorder = await SalesOrderModel.findByPk(id);
  
    salesorder.delete_at = Date.now();
    salesorder.user_id = params.user_id;
  
    await salesorder.save();
  };
  