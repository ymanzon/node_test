const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const PurchasesOrdersDetailsModel = sequelize.define('PurchasesOrdersDetailsModel', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    purchases_orders_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
    unitPrice: {
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
    tableName: 'purchases_orders_details',
    timestamps: false,
  });
  
  const PurchasesOrdersDetailsModelView = sequelize.define('PurchasesOrdersDetailsModelView', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    purchases_orders_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
    unitPrice: {
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
    tableName: 'purchases_orders_details_view',
    timestamps: false,
  });

  module.exports = {PurchasesOrdersDetailsModel, PurchasesOrdersDetailsModelView};
  