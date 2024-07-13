const { check, validationResult } = require('express-validator');

const orderValidator = [
    check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    check('user_id').notEmpty().withMessage('User ID is required').isNumeric().withMessage('User ID must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
];

module.exports = orderValidator;