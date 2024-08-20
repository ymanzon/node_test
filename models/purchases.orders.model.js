const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const PurchaseOrderModel = sequelize.define('PurchaseOrderModel', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    legal_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    provider_id: {
      type: DataTypes.BIGINT,
      allowNull: false
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
    user_id:{
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    update_at: {
      type: DataTypes.DATE,
    },
    delete_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'purchases_orders',
    timestamps: false,
  });

  const PurchaseOrderModelView = sequelize.define('PurchaseOrderModelView', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    legal_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    provider_id: {
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
    user_id:{
      type:DataTypes.BIGINT,
      allowNull:false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_at: {
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'purchases_orders_view',
    timestamps: false,
  });
  
  module.exports = {PurchaseOrderModel, PurchaseOrderModelView};
  