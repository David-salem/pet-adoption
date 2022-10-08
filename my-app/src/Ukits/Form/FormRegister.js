import "./FormStyle.css";
import { useState } from 'react';
import axios from 'axios';
import { userRegistrationSchema } from "../../yupValidation/userValidation";
import { Formik, Form, Field } from "formik";
import { InputFormRegister } from "../Input/InputFormRegister/InputFormRegister";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export const FormRegister = () => {
    const [loader, setLoader] = useState(false);
    const [succesMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const initialValues = {
        Name: "",
        Surname: "",
        Email: "",
        Password: "",
        "Confirm Password": "",
        Phone: ""
      };

    const submitForm = (values, resetForm) => {
        setErrorMessage("");
        setSuccessMessage("");
        setLoader(true);
        axios.post(
            'http://localhost:4000/users/register',
            {   
                Name: values.Name,
                Surname: values.Surname,
                Email: values.Email,
                Password: values.Password,
                Phone: values.Phone
            }
        ).then(resp => {
            console.log('values', values);
            setSuccessMessage("User created successfully, go to login")
            resetForm({values: ""});
            setLoader(false);
        }).catch(err => {
            setErrorMessage(err.response.data.response);
            setLoader(false);
        })
    };

    return (
        <div>
            <Formik
            initialValues={initialValues}
            validationSchema={userRegistrationSchema}
            onSubmit={(values, {resetForm}) => {
                submitForm(values, resetForm)
            }}>
                    
                {(formik) => {
                    const {
                    dirty,
                    isValid,
                    } = formik;

                return (
                    <div>
                            <Form>
                                <Field name="Name" component={InputFormRegister} />
                                <Field name="Surname" component={InputFormRegister} />
                                <Field name="Email" component={InputFormRegister} />
                                <Field name="Password"  component={InputFormRegister} />
                                <Field name="Confirm Password" component={InputFormRegister} />
                                <Field name="Phone" component={InputFormRegister} />

                                <div className="succes-form-login">
                                    {succesMessage && <Alert severity="success">{succesMessage}</Alert>}
                                </div>

                                <div className="succes-form-login">
                                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                                </div>

                                <div className='button-register'>
                                    {loader ? <div className="circular-register"><CircularProgress /></div> : 
                                    <button
                                    type="submit"
                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                    disabled={!(dirty && isValid)}>
                                    Register
                                    </button>}
                                </div>
                            </Form>
                    </div>
                    );
                }}
            </Formik>
        </div>
    );
};


{/* <Field name="lastName" placeholder="Doe" component={MyInput} /> 

withFormik({
 mapPropsToValues: () => ({
  current_password: "",
  new_password: "",
  re_new_password: ""
 }),
 validationSchema: Yup.object().shape({
  current_password: Yup.string()
   .min(6, "This field must be at least 6 characters")
   .required("This field is required"),
  new_password: Yup.string()
   .min(8, "The password must be at least 8 characters")
   .required("New Password is required"),
  re_new_password: Yup.string()
   .oneOf([Yup.ref("new_password"), null], "Passwords don't match.")
   .required("Password confirm is required")
 }),
 handleSubmit: (
  { current_password, new_password, re_new_password },
  { props, setSubmitting, setErrors, resetForm }
 ) => {
  props
   .changePassword({ current_password, new_password, re_new_password })
   .then(() => window.scrollTo(0, 0))
   .then(() => resetForm());
  setSubmitting(false);
 },
 displayName: "ChangePasswordForm" //hlps with react devtools
})(InnerPwForm)


*/}
