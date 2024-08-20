const { body, check } = require("express-validator");

const createValidator = [
	body('legal_number')
    .exists({ checkFalsy : false }).withMessage("legal number code is required").isLength({min:6, max:255}).withMessage("legal number min : 6 max 255"),
    body('customer_id')
    .exists({ checkFalsy : false }).withMessage("customer id is required").isInt().withMessage("customer id is integer"),
	body('subtotal')
    .exists({ checkFalsy : false }).withMessage("Lastname is required").isDecimal().withMessage("subtotal is decimal type"),
    body('total')
    .exists({ checkFalsy : false }).withMessage("Lastname is required").isDecimal().withMessage("total is decimal type "),
    body('active')
    .exists({checkFalsy:false}).withMessage("Active is required").isBoolean().withMessage("active require datetype bool"),
    body('details')
    .exists({checkFalsy:false}).withMessage("details is required").isArray().withMessage("details is array data type").custom(
        details => {
            if (details.length === 0) throw new Error("Details array cannot be empty");

            return true;
        },
    body('details.*.product_id')
    .exists({ checkFalsy: true }).withMessage("Product ID is required")
    .isInt().withMessage("Product ID must be an integer"),
    body('details.*.quantity')
    .exists({ checkFalsy: true }).withMessage("Quantity is required")
    .isDecimal().withMessage("Quantity must be a decimal value"),
    body('details.*.unit_price')
    .exists({ checkFalsy: true }).withMessage("unit price is required")
    .isDecimal().withMessage("Unit price must be a decimal value if provided"),
    body('details.*.total')
    .exists({ checkFalsy: true }).withMessage("total is required")
    .isDecimal().withMessage("Total must be a decimal value if provided"),
    )
]

module.exports = {createValidator}

/*id
legal_number
customer_id
subtotal
total
active
 */