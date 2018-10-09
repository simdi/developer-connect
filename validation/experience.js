const Validator = require('validator');
const Helpers = require('../Helpers/helpers');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !Helpers.isEmpty(data.title) ? data.title : '';
    data.company = !Helpers.isEmpty(data.company) ? data.company : '';
    data.from = !Helpers.isEmpty(data.from) ? data.from : '';
    data.location = !Helpers.isEmpty(data.location) ? data.location : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }
    
    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }
    
    if (Validator.isEmpty(data.location)) {
        errors.location = 'Location field is required';
    }

    return {
        errors,
        isValid: Helpers.isEmpty(errors)
    }
}