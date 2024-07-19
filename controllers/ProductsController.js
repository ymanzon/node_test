const db = require("../config/db");
const { Ok, Created, BadRequest } = require("../Responses/HttpResponses");
const { ValidModel } = require("../validators/Validator");

//GET
exports.filter = async (req, res) => {
  Ok("datos", res);
};

///POST
exports.create = async (req, res, next) => {
  try {
    const errors = ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      Created("se creo", res);
    }
    //if(errors)////
  } catch (error) {
    BadRequest(error.message, res);
  }
};

///PUT
exports.update = async (req, res) => {};

///DEL
exports.delete = async (req, res) => {};

//PUT
exports.changeStatus = async (req, res) => {};

/*exports.getProtectedData = (req, res) => {
  res.status(200).send('This is protected data');
};
 */
