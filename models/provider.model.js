const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const ProviderModel = sequelize.define('ProviderModel', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    prov_code:{
      type:DataTypes.STRING(10),
      allowNull:false,
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
    user_id :{
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
    tableName: 'providers',
    timestamps: false
  });
  
  const ProviderModelView = sequelize.define('ProviderModelView', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    prov_code:{
      type:DataTypes.STRING(10),
      allowNull:false,
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
    create_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'providers_view',
    timestamps: false
  });
  

  module.exports = {ProviderModel , ProviderModelView};