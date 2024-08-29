const db = require("../config/db");
const { Op } = require("sequelize");
const { BrandModel, BrandViewModel } = require("../models/brand.model");
const { CreateAction, UpdateAction, DeleteAction, RetriveAction }  = require ('../services/LogService');

exports.Create = async (body) => {
  console.log(body);
  const { name, active, photo_path, user_id } = body;

  let results = await BrandModel.findOne({ where: { name: name } });

  if (results) {
    throw Error(`Brand name '${name}' alrealy exists.`);
  }

  await BrandModel.create({
    name: name,
    active: active,
    photo_path: photo_path,
    user_id: user_id,
  });

  let logMesage = {
    name: name,
    active: active,
    photo_path: photo_path
  }

  await CreateAction(logMesage, user_id, 'BRAND');
};

//GetById
exports.ById = async (body) => {
  const { id, user_id} = body;
  const logMesage = {
    user_id : user_id,
    METRHOD: 'REGRIVE'
  }
  await RetriveAction(logMesage, user_id, 'BRAND');
  return await BrandViewModel.findAll({ where: {id : id} });
};

exports.Retrive = async (body) => {
  const {
    name,
    active,
    filter_by,
    start_date,
    end_date,
    user_id,
  } = body;

  let parameters = [];
  if (name) parameters.push({ name: { [Op.like]: `%${name}%` } });

  if (active) parameters.push({ active: active == "true" ? 1 : 0 });

  
  if (filter_by) {
    const dateField = `${filter_by}`;
    
    if (start_date) 
      parameters.push({ [dateField]: { [Op.gte]: new Date(start_date) } });
    
    if (end_date) 
      parameters.push({ [dateField]: { [Op.lte]: new Date(end_date) } });
    
  }

  //se utiliza la vista para recuperar la invormacion de las marcas
  const results = await BrandViewModel.findAll({ where: parameters });

  return results;
};

exports.Update = async (body, params) => {
  const { id } = params;
  const { name, active, user_id, photo_path } = body;

  //buscar si existe ese mismo registro con el mismo nombre, o valores que se deben validar antes de presregistrarse.
  let preExists = await BrandModel.findOne({
    where: {
      name: name,
      id: {
        [Op.ne]: id,
      },
    },
  });

  if (preExists) {
    throw Error(
      `The brand cannot be updated because the name '${name}' already exists.`
    );
  }

  //find row by primary key
  const brand = await BrandModel.findByPk(id);

  if (!brand) {
    throw Error(`Brand '${id}' not found.`);
  }

  brand.name = name;
  brand.active = active;
  brand.update_at = Date.now();
  brand.user_id = user_id;
  brand.photo_path = photo_path ?? brand.photo_path ;

  await brand.save();
};

exports.Delete = async (params) => {
  const { id } = params;

  let preExists = await BrandViewModel.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The brand ${id} not exists.`);
  }

  let brand = await BrandModel.findByPk(id);

  brand.delete_at = Date.now();
  brand.user_id = params.user_id;

  await brand.save();
};


exports.ChangeStatusActive = async (params) => {
  const { id, active, user_id } = params;

  let preExists = await BrandViewModel.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The brand ${id} not found.`);
  }

  if(preExists.active == active ){
    throw Error(`The brand ${id} is ${active?'activated':'deactivated'}!`);
  }

  let brand = await BrandModel.findByPk(id);

  brand.update_at = Date.now();
  brand.active = active;
  brand.user_id = user_id;

  await brand.save();
}