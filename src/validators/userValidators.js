const { check, validationResult } = require('express-validator');

const userValidator = [
    check('first_name').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
    check('last_name').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),
    check('age').isNumeric().withMessage('Age must be a number').notEmpty().withMessage('Age is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }

];

module.exports = userValidator;