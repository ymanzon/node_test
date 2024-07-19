const db = require("../config/db");
const { Ok, BadRequest } = require("../Responses/HttpResponses");
const repository = require("../repositories/BrandRepository");
const { ValidWithThrown, ValidModel } = require("../validators/Validator");
//GET
exports.filter = async (req, res) => {
    console.log(req.query);
    try {
        let brands = await repository.Retrive(req.query);
        Ok({brands : brands}, res);
    } catch (error) {
        BadRequest(error.message, res);
    }
};

///POST
exports.create = async (req, res) => {
  try {
    const errors = ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      await repository.Create(req.body);
      Ok("Brand regiter", res);
    }
  } catch (error) {
    BadRequest(error.message, res);
  }
};

///PUT
exports.update = async (req, res) => {

    try {
        console.log(req.params);
        
        await repository.Update(req.body, req.params);
          Ok("Brand updated", res);
          /*
        const errors = ValidModel(req);
        if (errors != null) {
          BadRequest(errors, res);
        } else {
          await repository.Update(req.body, req.user.id);
          Ok("Brand updated", res);
        }*/
      } catch (error) {
        BadRequest(error.message, res);
      }

};

///DEL
exports.delete = async (req, res) => {};

//PUT
exports.changeStatus = async (req, res) => {};
