//const {config} = require('../config/sequelize.config');
const BrandModel = require("../models/brand.model");
//const sequelize = require("../models/brand.model").sequelize;

const CreateBrand = async (body, user_id) => {
  //try {
  const { name, active } = body;

  const _brand = await BrandModel.findOne({ where: { name } });
  if (_brand) {
    throw Error("brand exist.");
  }

  const newBrand = await BrandModel.create({ name, active, user_id });

  return  newBrand;
};

module.exports = { CreateBrand }