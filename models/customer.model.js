const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const CustomerModel = sequelize.define('CustomerModel', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  cust_code:{
    type:DataTypes.STRING,
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
    type: DataTypes.BOOLEAN,
    allowNull:FontFaceSetLoadEvent,
  },
  user_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull:true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull:true,
  },
}, {
  tableName: 'customers',
  timestamps: true
});

const CustomerModelView = sequelize.define('CustomerModelView', {
}, {
  tableName: 'customers_view',
  timestamps: true
});


module.exports = {CustomerModel, CustomerModelView};
