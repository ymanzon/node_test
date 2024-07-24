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
      await repository.Create(req.body, req.user.id);
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
      await repository.Update(req.body, req.params, req.user.id);
      Ok("Product updated", res);
    }
  } catch (error) {
    BadRequest(error.message, res);
  }
};

///DEL
exports.delete = async (req, res) => {
  try {
    await repository.Delete(req.params, req.user.id);
    Ok("Product is deleted", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
};
