const { Op } = require("sequelize");
const { StockTransactionsModel, StockTransactionsView } = require("../models/stock.transaction.model");
const { CreateAction, UpdateAction, DeleteAction }  = require ('../services/LogService');

