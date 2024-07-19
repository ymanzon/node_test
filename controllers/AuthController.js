const authRepository = require("../repositories/AuthRepository");
const db = require("../config/db");

//const { validationResult } = require("express-validator");
const validModel = require("../validators/Validator");
const service = require("../repositories/AuthRepository");
const { Ok, BadRequest } = require("../Responses/HttpResponses");

exports.register = async (req, res, next) => {
  try {
    const errors = validModel.ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      await service.Register(req.body);
      Ok("user register", res);
    }
  } catch (error) {
    BadRequest(error.message, res);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const errors = validModel.ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      const token = await service.Auth(req.body);
      Ok(token, res);
    }
  } catch (error) {
    //res.status(500).send("Error logging in");
    BadRequest(error.message, res);
  }
};
