const db = require('../config/db');
const { Ok, BadRequest } = require("../Responses/HttpResponses");
const { ValidModel } = require("../validators/Validator");
//GET
exports.filter = async (req, res)=>{ }

///POST
exports.create = async (req, res) => {

    try {

        //ValidModel(req);

        //repository.Create(req.body);
        Ok("Brand regiter", res);
    } catch (error) {
        BadRequest(error.message, res);
    }
 }

///PUT
exports.update = async (req, res) => { }

///DEL
exports.delete = async (req, res) => { }

//PUT
exports.changeStatus = async (req, res) => { }
