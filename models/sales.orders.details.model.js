const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const SalesOrderzDetailsModel = sequelize.define('SalesOrderzDetailsModel', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    sales_orders_id:{
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    legal_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL,
    },
    total: {
      type: DataTypes.DECIMAL,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, {
    tableName: 'sales_orders_details',
    timestamps: false, 
  });

  const SalesOrderzDetailsModelView = sequelize.define('SalesOrderzDetailsModelView', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    sales_orders_id:{
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    legal_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL,
    },
    total: {
      type: DataTypes.DECIMAL,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    tableName: 'sales_orders_details_view',
    timestamps: false, 
  });
  

  
  module.exports = {SalesOrderzDetailsModel, SalesOrderzDetailsModelView};
  