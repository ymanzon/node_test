const { sequelize } = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");
const { ProductPhotosModel } = require('../models/product.photos.model');

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
    /*quantity:{
      type: DataTypes.DECIMAL,
      allowNull: false,
    }*/
  },
  {
    tableName: "products_view",
    timestamps: false,
  }
);

const ProductsInventaryView = sequelize.define(
  "ProductsInventaryView",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    sku: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    brand_id: {
      type: DataTypes.BIGINT,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    create_at: {
      type: DataTypes.DATE,
    },
    update_at: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity:{
      type: DataTypes.DECIMAL,
    }
  },
  {
    tableName: "products_inventary_view",
    timestamps: false,
  }
);


ProductsInventaryView.hasMany(ProductPhotosModel, {
  foreignKey: 'product_id',
  sourceKey: 'id',
  as: 'photos' // Alias para acceder a las imágenes del producto
});

ProductPhotosModel.belongsTo(ProductsInventaryView, {
  foreignKey: 'product_id',
  targetKey: 'id',
})

module.exports = { ProductModel, ProductView, ProductsInventaryView};
