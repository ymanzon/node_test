const { Ok, BadRequest } = require("../Responses/HttpResponses");
const repository = require("../repositories/ProviderRepository");
const { ValidWithThrown, ValidModel } = require("../validators/Validator");

//GET
exports.filter = async (req, res) => {
  try {
    //req.query.user_id = req.user.id;
    let providers = await repository.Retrive( req.query );
    Ok({ providers: providers }, res);
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
      await repository.Create(req.body);
      Ok("Provider created", res);
    }
  } catch (error) {
    BadRequest(error.message, res);
  }
};

///PUT
exports.update = async (req, res) => {
  try {
    console.log("update")
    const errors = ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      req.body.user_id = req.user.id;
      await repository.Update(req.body, req.params);
      Ok("Proovider updated", res);
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
    Ok("Provider is deleted", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
};

exports.findById = async (req, res) => {
  try {
    req.query.user_id = req.user.id;
    req.query.id = req.params.id;
    let providers = await repository.ById( req.query );
    Ok({ providers: providers }, res);
  } catch (error) {
    BadRequest(error.message, res);
  }
};

exports.activate = async(req, res) => {
  console.log("active");
  try {
    req.params.user_id = req.user.id;
    req.params.active = true;
    console.log(req.params);
    await repository.ChangeStatusActive(req.params);
    Ok("Provider is activate", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
}

exports.deactivate = async(req, res) => {
  try {
    req.params.user_id = req.user.id;
    req.params.active = false;
    await repository.ChangeStatusActive(req.params);
    Ok("Provider is deactivate", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
}
