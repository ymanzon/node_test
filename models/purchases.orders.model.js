const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const PurchaseOrderModel = sequelize.define('PurchaseOrderModel', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    legalNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    providerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Provider,
        key: 'id',
      },
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'purchases_orders',
    timestamps: true,
  });
  
  module.exports = PurchaseOrderModel;
  