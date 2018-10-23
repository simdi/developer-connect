const Validator = require('validator');
const Helpers = require('../Helpers/helpers');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !Helpers.isEmpty(data.school) ? data.school : '';
    data.degree = !Helpers.isEmpty(data.degree) ? data.degree : '';
    data.fieldOfStudy = !Helpers.isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
    data.from = !Helpers.isEmpty(data.from) ? data.from : '';
    data.location = !Helpers.isEmpty(data.location) ? data.location : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }
    
    if (Validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'Field of study field is required';
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