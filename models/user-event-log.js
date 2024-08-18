const { sequelize } = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");

//id, module, user_action, user_id, create_at, event_content
const UserEventLogModel = sequelize.define(
  "UserEventLogModel",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    event_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
  },
  {
    tableName: "user_event_log",
    timestamps: false,
  }
);

const UserEventLogView = sequelize.define(
  "UserEventLogView",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    event_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "user_event_log_view",
    timestamps: false,
  }
);

module.exports = { UserEventLogModel, UserEventLogView };
