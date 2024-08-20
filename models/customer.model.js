const { sequelize } = require('../config/sequelize.config');
const { DataTypes } = require('sequelize');

const CustomerModel = sequelize.define('CustomerModel', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  cust_code:{
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
    type: DataTypes.BOOLEAN,
    allowNull:false,
  },
  user_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
  },
  create_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  update_at: {
    type: DataTypes.DATE,
    allowNull:true,
  },
    delete_at:{
      type:DataTypes.DATE,
      allowNull:true,
    }
}, {
  tableName: 'customers',
  timestamps: false
});

const CustomerModelView = sequelize.define('CustomerModelView', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  cust_code:{
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
    type: DataTypes.BOOLEAN,
    allowNull:false,
  },
  user_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
  },
  create_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  update_at: {
    type: DataTypes.DATE,
    allowNull:true,
  }
}, {
  tableName: 'customers_view',
  timestamps: false
});


module.exports = {CustomerModel, CustomerModelView};
