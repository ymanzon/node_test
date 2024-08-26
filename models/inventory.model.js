const { sequelize } = require("../config/sequelize.config");
const { Sequelize, DataTypes, DECIMAL } = require("sequelize");

const InventoryModel = sequelize.define(
  "InventoryModel",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: { type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
    allow_negative: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    update_at: { type: DataTypes.DATE, allowNull: true },
    delete_at: { type: DataTypes.BIGINT, allowNull: true },
  },
  {
    tableName: "inventory",
    timestamps: false,
  }
);

/**id,, product_id, quantity, ACTIVE, user_id, create_at, update_at, sku, product_name, brand_id, brand_name, photo_path */
const InventoryView = sequelize.define(
  "InventoryView",
  {
    product_id:{
      type: DataTypes.INTEGER
    },
    product_name: {
      type:DataTypes.STRING
    },
    quantity: {
      type: DataTypes.DECIMAL
    },
    active:{
      type:DataTypes.BOOLEAN
    },
    user_id:{
      type:DataTypes.INTEGER
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
    brand_name:{
      type:DataTypes.STRING
    },
    photo_path:{
      type:DataTypes.STRING
    }
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

module.exports = { InventoryModel, InventoryView };
