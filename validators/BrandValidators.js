const { body, check } = require("express-validator");

const createValidator = [
    body('name')
    .exists({ checkFalsy : false }).withMessage("Name is required").isLength({min:1, max:50}).withMessage("brand min : 10 max 50"),
    body('active')
    .exists({checkFalsy:false}).withMessage("Active is required").isBoolean().withMessage("active require datetype bool")    
]


module.exports = {createValidator}