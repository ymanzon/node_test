const { sequelize } = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");

//stock_transactions_quantity_view
const InventoryQuantityViewModel = sequelize.define(
  "InventoryQuantityViewModel",
  {
    product_id:{
      type:DataTypes.BIGINT,
      primaryKey: true
    },
    quantity:{
      type: DataTypes.DECIMAL
    }
},
{
   tableName: "stock_transactions_quantity_view",
   timestamps: false,
}
);

/**id,, product_id, quantity, ACTIVE, user_id, create_at, update_at, sku, product_name, brand_id, brand_name, photo_path */
const InventoryView = sequelize.define(
  "InventoryView",
  {
    product_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    product_name: {
      type:DataTypes.STRING
    },
    quantity: {
      type: DataTypes.DECIMAL
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_id:{
      type:DataTypes.BIGINT
    },
    create_at:{
      type:DataTypes.DATE
    },
    update_at:{
      type:DataTypes.DATE
    },
    sku:{
      type:DataTypes.STRING
    },
    brand_id: {
      type:DataTypes.INTEGER
    },
    /*brand_name:{
      type:DataTypes.STRING
    },*/
    /*photo_path:{
      type:DataTypes.STRING
    }*/
  },
  {
    tableName: "inventory_view",
    timestamps: false,
    defaultScope: {
      attributes: {
        //exclude: ['sku', 'product_name', 'brand_name' ]
      }
    }, 
    scopes:{
      withProduct:{
        attributes:{
          include: ['product_id', 'sku', 'product_name', 'brand_id', 'brand_name' ]
        }
      }
    },
    hooks: {
      afterFind: ( result ) => {
        //
        if(!Array.isArray(result)) result = [result];

        

        result.forEach( item => {
          //console.log(result);
          // if (item && item.dataValues) 
          if (item && item.dataValues) {
            item.dataValues.product = {
              id:item.product_id,
              name: item.product_name,
              sku: item.sku,
              brand: {
                id: item.brand_id,
                name: item.brand_name,
              }
            }
          }
        });
      }
    }
  }
);

module.exports = { InventoryView , InventoryQuantityViewModel};
