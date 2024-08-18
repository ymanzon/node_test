const { sequelize } = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");

const UserModel = sequelize.define(
  "UserModel",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
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
    photo_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

const UserView = sequelize.define(
  "UserView",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
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
    delete_at: { type: DataTypes.DATE, allowNull: true },
    photo_path: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "users_view",
    timestamps: false,
  }
);

module.exports = { UserModel, UserView };
