const db = require("../config/db");
const { Op } = require("sequelize");
const { CustomerModel, CustomerModelView } = require("../models/customer.model");
const { CreateAction, UpdateAction, DeleteAction }  = require ('../services/LogService');

exports.Create = async (body) => {
  const { cust_code, firstname, lastname, active, user_id } = body;

  let results = await CustomerModel.findOne({ where: { cust_code: cust_code } });

  if (results) {
    throw Error(`Customer code '${cust_code}' already exists.`);
  }

  await CustomerModel.create({
    cust_code: cust_code,
    firstname: firstname,
    lastname:lastname,
    active: active == "true" ? 1 : 0,
    user_id: user_id,
  });

  let logMesage = {
    cust_code: cust_code,
    firstname: firstname,
    lastname:lastname,
    active: active == "true" ? 1 : 0,
    user_id: user_id,
  }

  await CreateAction(logMesage, user_id, 'CUSTOMERS');
};

exports.Retrive = async (body) => {
  const {
    cust_code,
    firstname,
    lastname,
    active,
    create_at,
    start_create_at,
    end_create_at,
    user_id,
  } = body;

  let parameters = [];
  if (cust_code) parameters.push({ cust_code: { [Op.like]: `%${cust_code}%` } });
  if (firstname) parameters.push({ firstname: { [Op.like]: `%${firstname}%` } });
  if (lastname) parameters.push({ lastname: { [Op.like]: `%${lastname}%` } });

  if (active) parameters.push({ active: active == "true" ? 1 : 0 });

  if (create_at) {
    let create_at_start = new Date(create_at);
    let create_at_end = new Date(create_at);

    create_at_end.setDate(create_at_start.getDate() + 1);

    parameters.push({ create_at: { [Op.gte]: create_at_start } });
    parameters.push({ create_at: { [Op.lte]: create_at_end } });
  }

  if (start_create_at) //<= gte
  {
    let create_at_start = new Date(start_create_at);
    parameters.push({ create_at: { [Op.gte]: create_at_start } });
  }

  if (end_create_at) //>= lte
  {
    let create_at_end = new Date(end_create_at);
    parameters.push({ create_at: { [Op.lte]: create_at_end } });
  }
  
  const results = await CustomerModelView.findAll({ where: parameters });

  return results;
};

exports.Update = async (body, params) => {
  const { id } = params;
  const { cust_code, firstname, lastname, active, user_id } = body;

  let preExists = await CustomerModel.findOne({
    where: {
      cust_code: cust_code,
      firstname: firstname,
      lastname:lastname,
      id: {
        [Op.ne]: id,
      },
    },
  });

  if (preExists) {
    throw Error(
      `The customer cannot be updated because the cust_code '${cust_code}' already exists.`
    );
  }

  //find row by primary key
  const customer = await CustomerModel.findByPk(id);

  if (!customer) {
    throw Error(`Customer '${id}' not found.`);
  }

  customer.firstname = firstname;
  customer.lastname = lastname;
  customer.cust_code = cust_code;
  customer.active = active == true ? 1 : 0;
  customer.update_at = Date.now();
  customer.user_id = user_id;

  await customer.save();
};

exports.Delete = async (params) => {
  const { id } = params;

  let preExists = await CustomerModel.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The customer ${id} not found.`);
  }

  let customer = await CustomerModel.findByPk(id);

  customer.delete_at = Date.now();
  customer.user_id = params.user_id;

  await customer.save();
};
