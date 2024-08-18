const { sequelize } = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");

const InventoryModel = sequelize.define(
  "InventoryModel",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: { type: DataTypes.DECIMAL, allowNull: false },
    allow_negative: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    update_at: { type: DataTypes.DATE, allowNull: true },
    delete_at: { type: DataTypes.BIGINT, allowNull: true },
  },
  {
    tableName: "inventory",
    timestamps: false,
  }
);

const InventoryView = sequelize.define(
  "InventoryView",
  {},
  {
    tableName: "inventory",
    timestamps: false,
  }
);

module.exports = { InventoryModel, InventoryView };
