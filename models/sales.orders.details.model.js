const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const SalesOrderzDetailsModel = sequelize.define('SalesOrderzDetailsModel', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'sales_orders_details',
    timestamps: false, 
  });
  
  module.exports = SalesOrderzDetailsModel;
  