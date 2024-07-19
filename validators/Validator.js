const {validationResult} = require('express-validator');

exports.ValidModel = (model, res) => {
    
    const errors = validationResult(model);

    if (!errors.isEmpty()) {
        return errors.array();
        //throw new Error( JSON.stringify(errors.array() ));
        /*return res.status(400).json({
            success: false,
            errors: errors.array(),
          });*/
    }

    return null;
}


exports.ValidWithThrown = (model, res) => {
    const errors = validationResult(model);

    if (!errors.isEmpty()) {
        //return errors.array();
        throw Error( {errors : errors.array() });
    }

    return null;
}