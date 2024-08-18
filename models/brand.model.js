const { sequelize } = require('../config/sequelize.config');
//const { DataTypes } = require('sequelize');
//require("dotenv").config();
const { Sequelize, DataTypes } = require('sequelize');

const BrandViewModel = sequelize.define(
  'BrandViewModel',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement:true,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delete_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    photo_path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    tableName: 'brands_view',
    timestamps: false
  }
);

const BrandModel = sequelize.define(
    'BrandModel',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      update_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      delete_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      photo_path: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },{
      tableName: 'brands',
      timestamps: false
    }
  );
  
  module.exports = {BrandModel, BrandViewModel};
  