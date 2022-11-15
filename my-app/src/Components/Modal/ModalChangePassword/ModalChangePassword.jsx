import "./ModalChangePassword.css";
import { Formik, Form } from "formik";
import { useState, useContext } from "react";
import { changePasswordSchema } from "../../../yupValidation/userValidation";
import { fetchUrlPut } from "../../../Lib/axios";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { userContext } from '../../../Context/userContext';


export const ModalChangePassword = ({setModal}) => {
    const { infoUser } = useContext(userContext);
    const [loader, setLoader] = useState(false);
    const [succesMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const initialValues = {
        Password: "",
        newPassword: "",
        confirmPassword: "",
      };

      const submitForm = (values, resetForm) => {
        setErrorMessage("");
        setSuccessMessage("");
        setLoader(true);

        fetchUrlPut(`/users/changePassword/${infoUser._id}`,{   
            Password: values.Password,
            newPassword: values.newPassword
        })
            .then(resp => {
                setSuccessMessage("Password changed successfully")
                resetForm({values: ""});
                setLoader(false);
            }).catch(err => {
                setErrorMessage(err.message);
                setLoader(false);
            })
    }

    return (
        <div className="body-modal-password">
            <h1>Change Password</h1>
            <Formik
            initialValues={initialValues}
            validationSchema={changePasswordSchema}
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
                                <div className="box-information-change-password">
                                    <div>
                                        <div className="formik-input-container-change-label">
                                                <label htmlFor="newPassword">Current Password</label>
                                                <label htmlFor="newPassword">New Password</label>
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                        </div>
                                        <div className="formik-input-container-change-input">
                                            <div>
                                                <input 
                                                type="password" 
                                                name="Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <div className="err-msg"> {touched.Password && errors.Password} </div>
                                            </div>
                                            <div>
                                                <input 
                                                type="password" 
                                                name="newPassword"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <div className="err-msg"> {touched.newPassword && errors.newPassword} </div>
                                            </div>
                                            <div>
                                                <input 
                                                type="password" 
                                                name="confirmPassword"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                                <div className="err-msg"> {touched.confirmPassword && errors.confirmPassword} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="succes-form-password">
                                    {succesMessage && <Alert severity="success">{succesMessage}</Alert>}
                                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                                </div>
                                <div className="box-change-pass-btn"> 
                                    {loader ? <div className="circular-change-password"><CircularProgress /></div> : 
                                    <button
                                    type="submit"
                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                    disabled={!(dirty && isValid)}>
                                    Accept
                                    </button>}
                                </div>
                            </Form>
                    </div>
                    );
                }}             
            </Formik>
            <button className="close-btn-password" onClick={() => setModal(false)}>Cancel</button>
        </div>
    )
}