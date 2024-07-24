//const db = require('../config/db');
const { Ok, BadRequest, Created } = require("../Responses/HttpResponses");
const repository = require('../repositories/UserRepository');
const {ValidModel} = require('../validators/Validator');
//GET
exports.filter = async (req, res)=>{ 
    try {
      let users = await repository.Retrive(req.query);
      Ok({ users: users }, res);
    } catch (error) {
      BadRequest(error.message, res);
    }

}

///POST
exports.create = async (req, res) => { 
    try {
        const errors = ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      await repository.Create(req.body, req.user.id);
      Ok("Create user", res);
    }
    } catch (error) {
        BadRequest(error.message, res);
    }
}

///PUT
exports.update = async (req, res) => { 
    try {
        const errors = ValidModel(req);
        if (errors != null) {
          BadRequest(errors, res);
        }else{
            await repository.Update(req.body, req.params, req.user.id);
            Ok("Update user", res);
        }
    } catch (error) {
        BadRequest(error.message, res);
    }
}

///DEL
exports.delete = async (req, res) => {
    //console.log(req.params);
    try {
        await repository.Delete(req.params, req.user.id);
        Ok("User is deleted", res);
      } catch (error) {
        BadRequest(error.message, res);
      }
 }

