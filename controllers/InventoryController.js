const db = require("../config/db");
const { Ok, BadRequest } = require("../Responses/HttpResponses");
const repository = require("../repositories/InventoryRepository");
const { ValidModel } = require("../validators/Validator");

exports.create = async (req, res) => {
    try {
      const errors = ValidModel(req);
      
      if (errors != null) {
        BadRequest(errors, res);
      } else {
        req.body.user_id = req.user.id;
        await repository.Create(req.body);
        Ok("inventory update", res);
      }
    } catch (error) {
      BadRequest(error.message, res);
    }
  };