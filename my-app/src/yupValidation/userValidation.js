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
    ConfirmPassword: yup.string()
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

export const addPetSchema = yup.object().shape({
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


export const editPetSchema = yup.object().shape({
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

export const userChangeData = yup.object().shape({
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

export const changePasswordSchema = yup.object().shape({
    Password: yup.string()
    .required("This field is required")
    .matches(/^[0-9A-Za-z]+$/, "Only alphabets and numbers are allowed for this field")
    .min(5, "Password must be at least 5 characters"),
    newPassword: yup.string()
    .required("This field is required")
    .matches(/^[0-9A-Za-z]+$/, "Only alphabets and numbers are allowed for this field")
    .min(5, "Password must be at least 5 characters"),
    confirmPassword: yup.string()
    .oneOf([yup.ref("newPassword"), null], "Passwords don't match")
    .required("This field is required"),
});