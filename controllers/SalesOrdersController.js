const { Ok, BadRequest } = require("../Responses/HttpResponses");
const repository = require("../repositories/SalesOrdersRepository");
const { ValidWithThrown, ValidModel } = require("../validators/Validator");

//GET
exports.filter = async (req, res) => {
    try {
      //let brands = await repository.Retrive(req.query);
      req.query.user_id = req.user.id;
      let salesOrders = await repository.Retrive( req.query );
      Ok({ salesOrders: salesOrders }, res);
    } catch (error) {
      BadRequest(error.message, res);
    }
  };

  ///POST
exports.create = async (req, res) => {
    try {
      //console.log(req);
  
      const errors = ValidModel(req);
      
      if (errors != null) {
        BadRequest(errors, res);
      } else {
        req.body.user_id = req.user.id;
        console.log(req.body);
        await repository.Create(req.body);
        Ok("Sales order created", res);
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
      Ok("Sales order is deleted", res);
    } catch (error) {
      BadRequest(error.message, res);
    }
  };
  