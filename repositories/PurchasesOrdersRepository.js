const {sequelize} = require("../config/sequelize.config");
const { Op } = require("sequelize");
const { PurchaseOrderModel, PurchaseOrderModelView } = require("../models/purchases.orders.model");
const { PurchasesOrdersDetailsModel, PurchasesOrdersDetailsModelView }  = require('../models/purchases.orders.details.model');
const { CustomerModelView, ProviderModel, ProviderModelView } = require("../models/provider.model");
const { CreateAction, UpdateAction, DeleteAction }  = require ('../services/LogService');
const { ProductView } = require("../models/product.model");
const { StockTransactionsModel } = require('../models/stock.transaction.model');
const { InventoryModel } = require('../models/inventory.model');
 //const {}

exports.Create = async (body) => {
    const {legal_number, provider_id, subtotal, total, active, user_id, details } = body;

    //customer 
    let providerRows = await ProviderModelView.findOne({where : { id: provider_id }});

    if(!providerRows)
      throw Error("Provider is not valid.");

    let results = await PurchaseOrderModel.findOne({where : { legal_number: legal_number }});

    if(results)
        throw Error(`Legalnumber already exists ${legal_number} for purchases orders`);

    const transaction = await sequelize.transaction();

    try {

        let purchasesOrderRow = await PurchaseOrderModel.create({
            legal_number:legal_number,
            provider_id: provider_id,
            subtotal:subtotal,
            total:total,
            user_id: user_id
        }, {transaction});

        for (let detail of details) {
          //validate product 
          //console.log(detail.product_id);
          var productRow = await ProductView.findOne({where : { id: detail.product_id }});

          if(!productRow) throw Error("product_id not valid.");

          //if(productRow.quantity <= 0) throw Error("product is out of stock");

          let target = {
            purchases_orders_id : purchasesOrderRow.id,
            legal_number: legal_number,
            product_id: detail.product_id,
            quantity: detail.quantity,
            unit_price: detail.unit_price,
            total: detail.total,
        };
        
            await PurchasesOrdersDetailsModel.create({
                purchases_order_id : purchasesOrderRow.id,
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
                type_move: 'IN',
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
        provider_id,
        active,
        create_at,
        create_at_before,
        create_at_after,
        user_id,
      } = body;
    
      
      let parameters = [];
      if (legal_number) parameters.push({ legal_number: { [Op.like]: `%${legal_number}%` } });

      if (provider_id) parameters.push({ provider_id: provider_id});
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
    
      const results = await PurchaseOrderModel.findAll({ where: parameters });
    
      return results; 
}

/*
exports.Update = async (body, params) => {

}
*/

exports.Delete = async (params) => {
    const { id } = params;
  
    let preExists = await PurchaseOrderModel.findOne({
      where: {
        id: id,
      },
    });
  
    if (!preExists) {
      throw Error(`The purchase order ${id} not found.`);
    }
  
    let purchasesorder = await PurchaseOrderModel.findByPk(id);
  
    purchasesorder.delete_at = Date.now();
    purchasesorder.user_id = params.user_id;
  
    await purchasesorder.save();
  };
  