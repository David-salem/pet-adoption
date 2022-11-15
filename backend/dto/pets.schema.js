const yup = require('yup');

let addPetSchema = yup.object().shape({
    Name: yup.string()
    .required("This field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Type: yup.string()
    .required("This field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Breed: yup.string()
    .required("This field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Color: yup.string()
    .required("This field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    AdoptionStatus: yup.string()
    .required("This field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Height: yup.number("Only numbers are allowed")
    .typeError('Only numbers are allowed')
    .min(2, "height must be at least 2 characters")
    .positive()
    .required("This field is required"),
    Weight: yup.number("Only numbers are allowed")
    .typeError('Only numbers are allowed')
    .min(2, "height must be at least 2 characters")
    .positive()
    .required("This field is required"),
    Hypoallergenic: yup.bool()
    .oneOf([true, false], 'Field must be checked'),
    DietaryRestrictions: yup.string()
    .required("This field is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Bio: yup.string()
    .max(35, "Must be 35 characters or less")
    .required("Required"),
});


let editPetSchema = yup.object().shape({
    Name: yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Type: yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Breed: yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Color: yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    AdoptionStatus: yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Height: yup.number("Only numbers are allowed")
    .typeError('Only numbers are allowed')
    .min(2, "height must be at least 2 characters")
    .positive(),
    Weight: yup.number("Only numbers are allowed")
    .typeError('Only numbers are allowed')
    .min(2, "height must be at least 2 characters")
    .positive(),
    Hypoallergenic: yup.bool()
    .oneOf([true, false], 'Field must be checked'),
    DietaryRestrictions: yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    Bio: yup.string()
    .max(35, "Must be 35 characters or less")
});

module.exports = { 
    addPetSchema,
    editPetSchema
};