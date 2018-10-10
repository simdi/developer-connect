const Validator = require('validator');
const Helpers = require('../Helpers/helpers');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !Helpers.isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: Helpers.isEmpty(errors)
    }
}