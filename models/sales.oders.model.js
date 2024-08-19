const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const SalesOrderModel = sequelize.define('SalesOrderModel', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    legal_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN, // Sequelize usa BOOLEAN en lugar de BIT
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'sales_orders',
    timestamps: true,
  });
  
  module.exports = SalesOrderModel;
  