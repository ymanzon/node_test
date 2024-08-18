const { body, check } = require("express-validator");

const inventoryValidator = [
    body('product_id')
    .exists({ checkFalsy : false }).withMessage("product_id is required").isInt().withMessage("product_id is numeric"),
    body('quantity')
    .exists({checkFalsy:false}).withMessage("quantity is required").isDecimal().withMessage("quantity is numeric")
]

module.exports = {inventoryValidator};