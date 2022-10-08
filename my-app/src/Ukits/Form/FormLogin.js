import { useState } from 'react';
import axios from 'axios';
import { userLoginSchema } from "../../yupValidation/userValidation";
import { Formik, Form, Field } from "formik";
import { InputFormLogin } from "../Input/InputFormLogin/InputFormLogin";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';


export const FormLogin = () => {
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const initialValues = {
        Email: "",
        Password: "",
      };

    const submitForm = (values, resetForm) => {
        setErrorMessage("");
        setLoader(true);
        axios.post(
            'http://localhost:4000/users/login',
            {   
                Email: values.Email,
                Password: values.Password,
            }
        ).then(resp => {
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
            validationSchema={userLoginSchema}
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
                                <Field name="Email" component={InputFormLogin} />
                                <Field name="Password" component={InputFormLogin} />

                                <div className="error-form-login">
                                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                                </div>

                                <div className='button-login'>
                                {loader ? <div className='circular-login'><CircularProgress /></div> :
                                <button
                                type="submit"
                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                disabled={!(dirty && isValid)}>
                                Login
                                </button> 
                                }
                                </div>

                            </Form>
                    </div>
                    );
                }}
            </Formik>
        </div>
    );
}
