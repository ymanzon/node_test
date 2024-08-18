const db = require("../config/db");
const { Ok, Created, BadRequest } = require("../Responses/HttpResponses");
const { ValidModel } = require("../validators/Validator");
const repository = require("../repositories/ProductRepository");

//GET
exports.filter = async (req, res) => {
  try {
    let products = await repository.Retrive(req.query);
    Ok({ products: products }, res);
  } catch (error) {
    BadRequest(error.message, res);
  }
};

///POST
exports.create = async (req, res, next) => {
  try {
    const errors = ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      req.body.user_id = req.user.id;
      await repository.Create(req.body);
      Ok("Product regiter", res);
    }
  } catch (error) {
    BadRequest(error.message, res);
  }
};

///PUT
exports.update = async (req, res) => {
  try {
    
    const errors = ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      req.body.user_id = req.user.id;
      await repository.Update(req.body, req.params);
      Ok("Product updated", res);
    }
  } catch (error) {
    BadRequest(error.message, res);
  }
};

///DEL
exports.delete = async (req, res) => {
  try {
    req.params.user_id = req.user.id;
    await repository.Delete(req.params);
    Ok("Product is deleted", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
};
