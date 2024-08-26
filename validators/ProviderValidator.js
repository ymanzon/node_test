const { body, check } = require("express-validator");

const createValidator = [
	body('prov_code')
    .exists({ checkFalsy : false }).withMessage("Provider code is required").isLength({min:3, max:10}).withMessage("provv_code min : 3 max 10"),
    body('firstname')
    .exists({ checkFalsy : false }).withMessage("Firstname is required").isLength({min:3, max:255}).withMessage("firstname min : 1 max 50"),
	body('lastname')
    .exists({ checkFalsy : false }).withMessage("Lastname is required").isLength({min:3, max:255}).withMessage("lastname min : 1 max 50"),
    body('active')
    .exists({checkFalsy:false}).withMessage("Active is required").isBoolean().withMessage("active require datetype bool")    
]

const updateValidator = [
    body('prov_code')
    .exists({ checkFalsy : false }).withMessage("Provider code is required").isLength({min:3, max:10}).withMessage("prov_code min : 1 max 10"),
    body('firstname')
    .exists({ checkFalsy : false }).withMessage("Firstname is required").isLength({min:3, max:255}).withMessage("firstname min : 1 max 50"),
	body('lastname')
    .exists({ checkFalsy : false }).withMessage("Lastname is required").isLength({min:3, max:255}).withMessage("lastname min : 1 max 50"),
    body('active')
    .exists({checkFalsy:false}).withMessage("Active is required").isBoolean().withMessage("active require datetype bool")    
]

module.exports = {createValidator, updateValidator}