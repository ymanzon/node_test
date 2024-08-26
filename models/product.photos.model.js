const { sequelize } = require('../config/sequelize.config');
const { Sequelize, DataTypes } = require('sequelize');

const ProductPhotosModel = sequelize.define(
  "ProductPhotosModel",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    photo_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: "product_photos",
    timestamps: false,
  }
);

/*
id
product_id
photo_path
create_at
update_at
user_id 
*/

module.exports = { ProductPhotosModel };
