const yup = require("yup");

export const userRegistrationSchema = yup.object().shape({
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
    password: yup.string()
    .oneOf([yup.ref("Password"), null], "Passwords don't match")
    .required("This field is required"),
    Phone: yup.number("Only numbers are allowed")
    .typeError('Only numbers are allowed')
    .min(8, "Phone number must be at least 8 characters")
    .positive()
    .required("This field is required")
    .integer()
});

export const userLoginSchema = yup.object().shape({
    Email: yup.string()
    .required("This field is required")
    .email("Invalid email format"),
    Password: yup.string()
    .required()
    .matches(/^[0-9A-Za-z]+$/, "Only alphabets and numbers are allowed for this field")
    .min(5, "Password must be at least 5 characters"),
});