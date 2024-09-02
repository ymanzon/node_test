const { Ok, BadRequest } = require("../Responses/HttpResponses");
const repository = require("../repositories/CustomerRepository");
const { ValidWithThrown, ValidModel } = require("../validators/Validator");

exports.findById = async (req, res) => {
  try {
    req.query.user_id = req.user.id;
    req.query.id = req.params.id;
    let customers = await repository.ById( req.query );
    Ok({ customers: customers }, res);
  } catch (error) {
    BadRequest(error.message, res);
  }
};

//GET
exports.filter = async (req, res) => {
  try {
    req.query.user_id = req.user.id;
    let customers = await repository.Retrive( req.query );
    Ok({ customers: customers }, res);
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
      //req.body.push(  );
      req.body.user_id = req.user.id;
      await repository.Create(req.body);
      Ok("Customer created", res);
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
      Ok("Customers updated", res);
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
    Ok("Customer is deleted", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
};

exports.activate = async(req, res) => {
  try {
    req.params.user_id = req.user.id;
    req.params.active = true;
    await repository.ChangeStatusActive(req.params);
    Ok("Customer is activate", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
}

exports.deactivate = async(req, res) => {
  try {
    req.params.user_id = req.user.id;
    req.params.active = false;
    await repository.ChangeStatusActive(req.params);
    Ok("Customer is deactivate", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
}