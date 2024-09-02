const { Op } = require("sequelize");
const { ProviderModel, ProviderModelView } = require("../models/provider.model");
const { CreateAction, UpdateAction, DeleteAction, RetriveAction }  = require ('../services/LogService');
const { generalFiltersParams } = require("../commons/general.filters.params");
const { BrandViewModel } = require("../models/brand.model");

exports.Create = async (body) => {
  console.log(body)
  const { prov_code, firstname, lastname, active, user_id , brand_id } = body;

  let results = await ProviderModelView.findOne({ where: { prov_code: prov_code } });

  if (results) {
    throw Error(`Provider code '${prov_code}' already exists.`);
  }

  let brand = await BrandViewModel.findByPk(brand_id);

  if( !brand )
      throw Error(`brand not exist, valid brand id`);

  await ProviderModel.create({
    prov_code: prov_code,
    firstname: firstname,
    lastname:lastname,
    brand_id: brand_id,
    active: active == "true" ? 1 : 0,
    user_id: user_id,
  });

  let logMesage = {
    prov_code: prov_code,
    firstname: firstname,
    lastname:lastname,
    brand_id: brand_id,
    active: active == "true" ? 1 : 0,
    user_id: user_id,
  }

  await CreateAction(logMesage, user_id, 'PROVIDERS');
};

exports.Retrive = async (body) => {
  let parameters = generalFiltersParams(body);
  const {
    prov_code,
    firstname,
    lastname,
  } = body;

  if (prov_code) parameters.push({ prov_code: { [Op.like]: `%${prov_code}%` } });
  if (firstname) parameters.push({ firstname: { [Op.like]: `%${firstname}%` } });
  if (lastname) parameters.push({ lastname: { [Op.like]: `%${lastname}%` } });

  const results = await ProviderModelView.findAll({ where: parameters });

  return results;
};

exports.Update = async (body, params) => {
  const { id } = params;
  const { prov_code, firstname, lastname, active, user_id, brand_id } = body;

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

  let brand = await BrandViewModel.findByPk(brand_id);

  if( !brand )
      throw Error(`brand not exist, valid brand id`);

  //find row by primary key
  const provider = await ProviderModel.findByPk(id);

  if (!provider) {
    throw Error(`Provider '${id}' not found.`);
  }

  provider.firstname = firstname;
  provider.lastname = lastname;
  provider.prov_code = prov_code;
  provider.active = active == true ? 1 : 0;
  provider.brand_id = brand_id;
  provider.update_at = Date.now();
  provider.user_id = user_id;

  await provider.save();
};

exports.ById = async (body) => {
  console.log(body);
  
  const { id, user_id} = body;
  const logMesage = {
    user_id : user_id,
    METRHOD: 'REGRIVE'
  }
  await RetriveAction(logMesage, user_id, 'PROVIDER');
  return await ProviderModelView.findAll({ where: {id : id} });
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

exports.ChangeStatusActive = async (params) => {
  const { id, active, user_id } = params;

  let preExists = await ProviderModelView.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The provider ${id} not found.`);
  }

  if(preExists.active == active ){
    throw Error(`The provider ${id} is ${active?'activated':'deactivated'}!`);
  }


  let provider = await ProviderModel.findByPk(id);

  provider.update_at = Date.now();
  provider.active = active == true?1:0;
  provider.user_id = user_id;

  await provider.save();
}