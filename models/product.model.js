const { sequelize } = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");

// id, sku, name, brand_id, active, create_at, update_at, delete_at, user_id

const ProductModel = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    delete_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

const ProductView = sequelize.define(
  "ProductsView",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    /*delete_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },*/
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "products_view",
    timestamps: false,
  }
);

module.exports = { ProductModel, ProductView };
