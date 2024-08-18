const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { UserModel, UserView } = require("../models/user.model");
const { Op } = require("sequelize");
const {
  CreateAction,
  UpdateAction,
  DeleteAction,
  RetriveAction,
} = require("../services/LogService");

exports.Create = async (body, user_id) => {
  const { name, email, password, active } = body;
  let results = await UserView.findOne({ where: { email: email } });
  if (results) throw Error(`The user with email '${email}' already exists`);

  const hashedPassword = await bcrypt.hash(password, 10);

  const userBody = {
    name: name,
    email: email,
    password: hashedPassword,
    active: active,
    user_id: user_id,
  };

  await UserModel.create(userBody);

  await CreateAction(userBody, user_id, "USER");
};

exports.Retrive = async (body) => {
  const { name, email, active, user_id, create_at, update_at } = body;

  let parameter = [];

  if (name) parameters.push({ name: { [Op.like]: `%${name}%` } });
  if (email) parameters.push({ email: { [Op.like]: `%${email}%` } });
  if (active) parameters.push({ active: active == "true" ? 1 : 0 });
  if (user_id) parameters.push({ user_id: user_id });
  //create_at
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

  const rows = await UserView.findAll({ where: parameters });

  //await RetriveAction(userBody, user_id, "USER");

  return rows;
};

exports.Update = async (body, params, user_id) => {
  const { id } = params;
  const { name, email, active } = body;

  let _active = active == true ? 1 : 0;

  //valida si trata de cambiar el nombre o el email si ya existe
  let preExist = await UserView.findOne({
    where :{
        email:email,
        id:{
            [Op.new]:id,
        }
    }
 });

 if(preExist){
    throw Error(
        `The user cannot be updated because the email '${email}' already exists.`
      );
 }

 const user = await UserModel.findByPk(id);

 if (!user) {
    throw Error(`User '${id}' not found.`);
  }

  user.name = name;
  //user.email = email;
  user.active = active == true?1:0;
  user.update_at = Date.now();
  //password
  user.password = await bcrypt.hash(password, 10);
  user.user_id = user_id;
  await user.save();

  //TODO
  //await UpdateAction()

};

exports.Delete = async (params, user_id) => {
  const { id } = params;

  let preExists = await UserModel.findOne({
    where: {
      id: id,
    },
  });

  if (!preExists) {
    throw Error(`The user ${id} not found.`);
  }

  let brand = await BrandModel.findByPk(id);

  brand.delete_at = Date.now();
  brand.user_id = params.user_id;

  await brand.save();

  //TODO
  //await DeleteAction()
};
