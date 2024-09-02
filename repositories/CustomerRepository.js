const db = require("../config/db");
const { Op } = require("sequelize");
const {
  CustomerModel,
  CustomerModelView,
} = require("../models/customer.model");
const {
  CreateAction,
  UpdateAction,
  DeleteAction,
} = require("../services/LogService");

const { generalFiltersParams } = require("../commons/general.filters.params");

exports.ById = async (body) => {
  console.log(body);
  const { id, user_id } = body;

  return await CustomerModelView.findAll({ where: { id: id } });
};

exports.Create = async (body) => {
  const { cust_code, firstname, lastname, active, user_id } = body;

  let results = await CustomerModel.findOne({
    where: { cust_code: cust_code },
  });

  if (results) {
    throw Error(`Customer code '${cust_code}' already exists.`);
  }

  await CustomerModel.create({
    cust_code: cust_code,
    firstname: firstname,
    lastname: lastname,
    active: active == "true" ? 1 : 0,
    user_id: user_id,
  });

  let logMesage = {
    cust_code: cust_code,
    firstname: firstname,
    lastname: lastname,
    active: active == "true" ? 1 : 0,
    user_id: user_id,
  };

  await CreateAction(logMesage, user_id, "CUSTOMERS");
};

exports.Retrive = async (body) => {
  let parameters = generalFiltersParams(body);
  
  const { id, cust_code, firstname, lastname } = body;

  if (id) parameters.push({ id: id });
  if (cust_code)
    parameters.push({ cust_code: { [Op.like]: `%${cust_code}%` } });
  if (firstname)
    parameters.push({ firstname: { [Op.like]: `%${firstname}%` } });
  if (lastname) parameters.push({ lastname: { [Op.like]: `%${lastname}%` } });

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
      lastname: lastname,
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

  if (customer.delete_at) throw Error(`Customer not exist's`);

  customer.delete_at = Date.now();
  customer.user_id = params.user_id;

  await customer.save();
};

exports.ChangeStatusActive = async (params) => {
  const { id, active, user_id } = params;

  let preExists = await CustomerModelView.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The customer ${id} not found.`);
  }

  if (preExists.active == active) {
    throw Error(
      `The customer ${id} is ${active ? "activated" : "deactivated"}!`
    );
  }

  let customer = await CustomerModel.findByPk(id);

  customer.update_at = Date.now();
  customer.active = active;
  customer.user_id = user_id;

  await customer.save();
};
