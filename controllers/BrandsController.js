const { Ok, BadRequest } = require("../Responses/HttpResponses");
const repository = require("../repositories/BrandRepository");
const { ValidWithThrown, ValidModel } = require("../validators/Validator");


exports.findById = async (req, res) => {
  try {
    req.query.user_id = req.user.id;
    let brands = await repository.ById(req.query);
    Ok({ brands: brands }, res);
  } catch (error) {
    BadRequest(error.message, res);
  }
}

//GET
exports.filter = async (req, res) => {
  try {
    req.query.user_id = req.user.id;
    let brands = await repository.Retrive(req.query);
    Ok({ brands: brands }, res);
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
      req.body.user_id = req.user.id;
      req.body.photo_path = req.file ? req.file.filename : null;

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
    const errors = ValidModel(req);
    if (errors != null) {
      BadRequest(errors, res);
    } else {
      req.body.user_id = req.user.id;
      req.body.photo_path = req.file ? req.file.filename : null;
      await repository.Update(req.body, req.params);
      Ok("Brand updated", res);
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
    Ok("Brand is deleted", res);
  } catch (error) {
    BadRequest(error.message, res);
  }
};


exports.activate = async(req, res) => {
  try {
    req.params.user_id = req.user.id;
    req.params.active = true;
    await repository.ChangeStatusActive(req.params)
    Ok(`Brand has been activated`, res)
  } catch (error) {
    BadRequest(error.message, res);
  }
}

exports.deactivate = async(req, res) => {
  try {
    req.params.user_id = req.user.id;
    req.params.active = false;
    await repository.ChangeStatusActive(req.params)
    Ok(`Brand has been deactivated`, res)
  } catch (error) {
    BadRequest(error.message, res);
  }
}