const Validator = require('validator');
const Helpers = require('../Helpers/helpers');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !Helpers.isEmpty(data.handle) ? data.handle : '';
    data.status = !Helpers.isEmpty(data.status) ? data.status : '';
    data.skills = !Helpers.isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle must be between 2 and 40 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle field is required';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if (!Helpers.isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Website is not a valid URL';
        }
    }
    if (!Helpers.isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Youtube is not a valid URL';
        }
    }
    if (!Helpers.isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Twitter is not a valid URL';
        }
    }
    if (!Helpers.isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Facebook is not a valid URL';
        }
    }
    if (!Helpers.isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Linkedin is not a valid URL';
        }
    }
    if (!Helpers.isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Instagram is not a valid URL';
        }
    }

    return {
        errors,
        isValid: Helpers.isEmpty(errors)
    }
}