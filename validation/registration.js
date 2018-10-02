const Validator = require('validator');
const Helpers = require('../Helpers/helpers');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !Helpers.isEmpty(data.name) ? data.name : '';
    data.email = !Helpers.isEmpty(data.email) ? data.email : '';
    data.phone = !Helpers.isEmpty(data.phone) ? data.phone : '';
    data.password = !Helpers.isEmpty(data.password) ? data.password : '';
    data.confirm_password = !Helpers.isEmpty(data.confirm_password) ? data.confirm_password : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (!Validator.isLength(data.phone, { min: 10, max: 16 })) {
        errors.phone = 'Phone is not a valid phone nmumber';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = 'Confirm password is required';
    }

    if (!Validator.equals(data.password, data.confirm_password)) {
        errors.password = 'Password does not match confirm password';
    }

    return {
        errors,
        isValid: Helpers.isEmpty(errors)
    }
}