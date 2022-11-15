import "./FormStyle.css";
import { useState } from 'react';
import axios from 'axios';
import { userRegistrationSchema } from "../../yupValidation/userValidation";
import { Formik, Form, Field } from "formik";
import { InputFormRegister } from "../";
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
        ConfirmPassword: "",
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
            setSuccessMessage("User created successfully, go to login")
            resetForm({values: ""});
            setLoader(false);
        }).catch(err => {
            console.log(err)
            setErrorMessage(err.response.data.message);
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
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    } = formik;

                return (
                    <div>
                            <Form>
                                <Field name="Name" component={InputFormRegister} />
                                <Field name="Surname" component={InputFormRegister} />
                                <Field name="Email" component={InputFormRegister} />
                                <Field name="Password"  component={InputFormRegister} />
                                <div className="formik-input-container-register">
                                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                                    <input 
                                    type="password" 
                                    name="ConfirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                    <div> {touched.ConfirmPassword && errors.ConfirmPassword} </div>
                                </div>
                                <Field name="Phone" component={InputFormRegister} />

                                <div className="succes-form-login">
                                    {succesMessage && <Alert severity="success">{succesMessage}</Alert>}
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