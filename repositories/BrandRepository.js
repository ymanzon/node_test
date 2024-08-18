const db = require("../config/db");
const { Op } = require("sequelize");
const { BrandModel, BrandViewModel } = require("../models/brand.model");
const           { CreateAction, UpdateAction, DeleteAction }  = require ('../services/LogService');

exports.Create = async (body) => {
  const { name, active, photo_path, user_id } = body;

  let results = await BrandModel.findOne({ where: { name: name } });

  if (results) {
    throw Error(`Brand name '${name}' alrealy exists.`);
  }

  //console.log(body);
  await BrandModel.create({
    name: name,
    active: active == "true" ? 1 : 0,
    photo_path: photo_path,
    user_id: user_id,
  });

  let logMesage = {
    name: name,
    active: active == "true" ? 1 : 0,
    photo_path: photo_path
  }

  await CreateAction(logMesage, user_id, 'BRAND');
};

exports.Retrive = async (body) => {
  const {
    name,
    active,
    create_at,
    create_at_before,
    create_at_after,
    user_id,
  } = body;

  let parameters = [];
  if (name) parameters.push({ name: { [Op.like]: `%${name}%` } });

  if (active) parameters.push({ active: active == "true" ? 1 : 0 });

  if (create_at) {
    let create_at_start = new Date(create_at);
    let create_at_end = new Date(create_at);

    create_at_end.setDate(create_at_start.getDate() + 1);

    console.log(create_at_start);
    console.log(create_at_end);

    parameters.push({ create_at: { [Op.gte]: create_at_start } });
    parameters.push({ create_at: { [Op.lte]: create_at_end } });
  }

  //menores que  create_at <=
  if (create_at_before)
    parameters.push({ create_at: { [Op.lte]: create_at_before } });
  //mayores que create_at >=
  if (create_at_after)
    parameters.push({ create_at: { [Op.gte]: create_at_after } });

  //update at
  /*
  if(user_id) 
    parameters.push( {user_id: user_id} );
  */

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
  brand.active = active == true ? 1 : 0;
  brand.update_at = Date.now();
  brand.user_id = user_id;
  brand.photo_path = photo_path ?? brand.photo_path ;

  await brand.save();
};

exports.Delete = async (params) => {
  const { id } = params;

  let preExists = await BrandModel.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The brand ${id} not found.`);
  }

  let brand = await BrandModel.findByPk(id);

  brand.delete_at = Date.now();
  brand.user_id = params.user_id;

  await brand.save();
};
