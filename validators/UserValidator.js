const { body, check } = require("express-validator");

const createValidator = [
  body("name")
    .exists({ checkFalsy: false })
    .withMessage("Name is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("length of field Name must be minimum 5 maximum 50 "),
  body("email")
    .exists({ checkFalsy: false })
    .withMessage("Email is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("length of field Email must be minimum 5 maximum 50 ")
    .isEmail()
    .withMessage("Email is not valid"),
  body("password")
    .exists({ checkFalsy: false })
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("length of field Password must be minimum 6 "),
];

const updateValidator = [
  body("name")
    .exists({ checkFalsy: false })
    .withMessage("Name is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("length of field Name must be minimum 5 maximum 50 "),
  body("email")
    .exists({ checkFalsy: false })
    .withMessage("Email is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("length of field Email must be minimum 5 maximum 50 ")
    .isEmail()
    .withMessage("Email is not valid"),
  body("password")
    .exists({ checkFalsy: false })
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("length of field Password must be minimum 6 "),
];

module.exports = { createValidator, updateValidator };
