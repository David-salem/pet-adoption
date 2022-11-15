const yup = require('yup');

let userRegistrationSchema = yup.object().shape({
    Name: yup.string()
    .required("This field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Surname: yup.string()
    .required("This field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Email: yup.string()
    .required("This field is required")
    .email("Invalid email format"),
    Password: yup.string()
    .required("This field is required")
    .matches(/^[0-9A-Za-z]+$/, "Only alphabets and numbers are allowed")
    .min(5, "Password must be at least 5 characters"),
    Phone: yup.number("Only numbers are allowed")
    .typeError('Only numbers are allowed')
    .min(8, "Phone number must be at least 8 characters")
    .positive()
    .required("This field is required")
    .integer() 
});

let userLoginSchema = yup.object().shape({
    Email: yup.string()
    .required("This field is required")
    .email("Invalid email format"),
    Password: yup.string()
    .required()
    .matches(/^[0-9A-Za-z]+$/, "Only alphabets and numbers are allowed for this field")
    .min(5, "Password must be at least 5 characters"),
});

let userChangeData = yup.object().shape({
    Name: yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Surname: yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Email: yup.string()
    .email("Invalid email format"),
    Phone: yup.number("Only numbers are allowed")
    .typeError('Only numbers are allowed')
    .min(8, "Phone number must be at least 8 characters")
    .positive()
    .integer(),
    Bio: yup.string()
    .max(50, "Must be 50 characters or less")
});

let changePasswordSchema = yup.object().shape({
    Password: yup.string()
    .required("This field is required")
    .matches(/^[0-9A-Za-z]+$/, "Only alphabets and numbers are allowed for this field")
    .min(5, "Password must be at least 5 characters"),
    newPassword: yup.string()
    .required("This field is required")
    .matches(/^[0-9A-Za-z]+$/, "Only alphabets and numbers are allowed for this field")
    .min(5, "Password must be at least 5 characters")
});

module.exports = {
    userRegistrationSchema,
    userLoginSchema,
    userChangeData,
    changePasswordSchema
};