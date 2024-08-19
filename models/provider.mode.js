const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const ProviderModel = sequelize.define('ProviderModel', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(255),
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
    tableName: 'providers',
    timestamps: true
  });
  
  module.exports = ProviderModel;