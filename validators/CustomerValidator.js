const { body, check } = require("express-validator");

const createValidator = [
	body('cust_code')
    .exists({ checkFalsy : false }).withMessage("Customer code is required").isLength({min:3, max:10}).withMessage("cust_code min : 3 max 10"),
    body('firstname')
    .exists({ checkFalsy : false }).withMessage("Firstname is required").isLength({min:3, max:255}).withMessage("firstname min : 1 max 50"),
	body('lastname')
    .exists({ checkFalsy : false }).withMessage("Lastname is required").isLength({min:3, max:255}).withMessage("lastname min : 1 max 50"),
    body('active')
    .exists({checkFalsy:false}).withMessage("Active is required").isBoolean().withMessage("active require datetype bool")    
]

const updateValidator = [
    body('cust_code')
    .exists({ checkFalsy : false }).withMessage("Customer code is required").isLength({min:3, max:10}).withMessage("cust_code min : 1 max 10"),
    body('firstname')
    .exists({ checkFalsy : false }).withMessage("Firstname is required").isLength({min:3, max:255}).withMessage("firstname min : 1 max 50"),
	body('lastname')
    .exists({ checkFalsy : false }).withMessage("Lastname is required").isLength({min:3, max:255}).withMessage("lastname min : 1 max 50"),
    body('active')
    .exists({checkFalsy:false}).withMessage("Active is required").isBoolean().withMessage("active require datetype bool")    
]

module.exports = {createValidator, updateValidator}