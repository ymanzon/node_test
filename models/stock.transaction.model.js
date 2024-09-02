const { sequelize } = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");

const StockTransactionsModel = sequelize.define(
  "StockTransations",
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
    //Cantidad que se va a procesar
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    //tipo de movimiento -> OUT=SALIDAS(DESCUENTA), IN=ENTRADAS(INCREMENTA), ADJ=AJUSTES(ACTUALIZA)
    type_move: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    //el movimiento puede existir, pero hasta que se aplique, se procesara
    processed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
  },
  {
    tableName: "stock_transactions",
    timestamps: false,
  }
);

const StockTransactionsView = sequelize.define(
  "StockTransationsView",
  {
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    product_id:{
      type:DataTypes.INTEGER
    },
    /*product_name:{
      type:DataTypes.STRING
    },
    brand_id:{
      type:DataTypes.STRING
    },
    brand_name:{
      type:DataTypes.STRING
    },*/
    quantity:{
      type:DataTypes.DECIMAL
    },
    type_move:{
      type:DataTypes.STRING
    },
    active:{
      type:DataTypes.BOOLEAN
    },
    processed:{
      type:DataTypes.BOOLEAN
    },
    user_id:{
      type:DataTypes.INTEGER
    },
    create_at:{
      type:DataTypes.DATE
    },
    update_at:{
      type:DataTypes.DATE
    }
  },
  {
    tableName: "stock_transactions_view",
    timestamps: false,
  }
);

module.exports = { StockTransactionsModel, StockTransactionsView };
