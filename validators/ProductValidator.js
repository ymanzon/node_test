const { body, check } = require("express-validator");


const productCreateValidator = [
 body("sku")
 .exists({ checkFalsy:false}).withMessage("SKU is required").isLength({min:8, max:50}).withMessage("SKU min 8 max 50"),
 body("name")
 .exists({ checkFalsy:false}).withMessage("Name is required").isLength({min:8, max:50}).withMessage("Name min 8 max 50"),
 body("brand_id")
 .exists({ checkFalsy:false}).withMessage("Brand_id is required").isInt().withMessage("Brand_id  requires int datatype"),
 body("active")
 .exists({ checkFalsy:false}).withMessage("active is required").isBoolean().withMessage("active is not bool datatype"),
]

const productUpdateValidator = [
    
]

module.exports = { productCreateValidator, productUpdateValidator }