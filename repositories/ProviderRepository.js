const { Op } = require("sequelize");
const { ProviderModel, ProviderModelView } = require("../models/provider.model");
const { CreateAction, UpdateAction, DeleteAction }  = require ('../services/LogService');

exports.Create = async (body) => {
  const { prov_code, firstname, lastname, active, user_id } = body;

  let results = await ProviderModelView.findOne({ where: { prov_code: prov_code } });

  if (results) {
    throw Error(`Provider code '${prov_code}' already exists.`);
  }

  await ProviderModel.create({
    prov_code: prov_code,
    firstname: firstname,
    lastname:lastname,
    active: active == "true" ? 1 : 0,
    user_id: user_id,
  });

  let logMesage = {
    prov_code: prov_code,
    firstname: firstname,
    lastname:lastname,
    active: active == "true" ? 1 : 0,
    user_id: user_id,
  }

  await CreateAction(logMesage, user_id, 'PROVIDERS');
};

exports.Retrive = async (body) => {
  const {
    prov_code,
    firstname,
    lastname,
    active,
    create_at,
    create_at_before,
    create_at_after,
    user_id,
  } = body;

  let parameters = [];
  if (prov_code) parameters.push({ prov_code: { [Op.like]: `%${prov_code}%` } });
  if (firstname) parameters.push({ firstname: { [Op.like]: `%${firstname}%` } });
  if (lastname) parameters.push({ lastname: { [Op.like]: `%${lastname}%` } });

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

  
  const results = await ProviderModelView.findAll({ where: parameters });

  return results;
};

exports.Update = async (body, params) => {
  const { id } = params;
  const { prov_code, firstname, lastname, active, user_id } = body;

  let preExists = await ProviderModel.findOne({
    where: {
        prov_code: prov_code,
      firstname: firstname,
      lastname:lastname,
      id: {
        [Op.ne]: id,
      },
    },
  });

  if (preExists) {
    throw Error(
      `The provider cannot be updated because the prov_code '${prov_code}' already exists.`
    );
  }

  //find row by primary key
  const provider = await ProviderModel.findByPk(id);

  if (!provider) {
    throw Error(`Provider '${id}' not found.`);
  }

  provider.firstname = firstname;
  provider.lastname = lastname;
  provider.prov_code = prov_code;
  provider.active = active == true ? 1 : 0;
  provider.update_at = Date.now();
  provider.user_id = user_id;

  await provider.save();
};

exports.Delete = async (params) => {
  const { id } = params;

  let preExists = await ProviderModel.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The provider ${id} not found.`);
  }

  let provider = await ProviderModel.findByPk(id);

  provider.delete_at = Date.now();
  provider.user_id = params.user_id;

  await provider.save();
};
