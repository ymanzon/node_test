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
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
    },
    delete_at: {
      type: DataTypes.DATE,
    },
    user_id:{
      type: DataTypes.BIGINT,
      allowNull:false,
    }
  }, {
    tableName: 'sales_orders',
    timestamps: false,
  });

  const SalesOrderModelView = sequelize.define('SalesOrderModelView', {
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
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'sales_orders_view',
    timestamps: false,
  });
  
  module.exports = {SalesOrderModel, SalesOrderModelView};
  