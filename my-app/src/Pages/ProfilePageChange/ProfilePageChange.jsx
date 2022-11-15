import "./ProfilePageChange.css";
import { useContext , useState } from 'react';
import { PicUserProfile } from "../../UIkits/PicUserProfile/PicUserProfile";
import { userContext } from '../../Context/userContext';
import { fetchUrlPut } from "../../Lib/axios";
import { Formik, Form, Field } from "formik";
import { InputFormLogin } from "../../UIkits";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { userChangeData } from "../../yupValidation/userValidation";
import { NavLink, useNavigate } from 'react-router-dom';

export const ProfilePageChange = () => {
    const { infoUser, fetchMe } = useContext(userContext);
    const [photo, setPhoto] = useState(null);
    const [loader, setLoader] = useState(false);
    const [succesMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [succesMessagePic, setSuccessMessagePic] = useState("");
    const [errorMessagePic, setErrorMessagePic] = useState("");
    const [loaderPic, setLoaderPic] = useState(false);
    const navigate = useNavigate();


    const initialValues = {
        Name: infoUser.Name ? infoUser.Name : "",
        Surname: infoUser.Surname ? infoUser.Surname : "",
        Email: infoUser.Email ? infoUser.Email : "",
        Phone: infoUser.Phone ? infoUser.Phone : "",
        Bio: infoUser.Bio ? infoUser.Bio : "",
      };

    const handleUpload = async() => {
        setLoaderPic(true);
        const formData = new FormData();

        formData.set('avatar', photo);

        return await fetchUrlPut(`/users/ProfilePic/${infoUser._id}`, formData)
        .then(() => {
            setSuccessMessagePic("Picture uploaded successfully")
            setLoaderPic(false);
            fetchMe();      
        }).catch(err => {
            setErrorMessagePic(err.message);
            setLoaderPic(false);
        })    
    };

    const handleChangePic = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
          }
    };

    const handleUpdate = (values, resetForm) => {
        setErrorMessage("");
        setSuccessMessage("");
        setLoader(true);

        fetchUrlPut(
            `/users/updateUser/${infoUser._id}`, {
                Name: values.Name,
                Surname: values.Surname,
                Email: values.Email,
                Phone: values.Phone,
                Bio: values.Bio,
            })
        .then(() => {
            setSuccessMessage("Data saved successfully")
            resetForm({values: ""});
            setLoader(false);
            fetchMe();
            setTimeout(() => {
                navigate('/profile')
              }, 3000);            
        }).catch(err => {
            setErrorMessage(err.message);
            setLoader(false);
        })
}
    

    return (
        <div className="profile-page-change">
            <h1>Update your information</h1>
            <p>Manage the settings of your profile</p>
            <div className="pic-profilepage-change">
                <h2>Your profile picture</h2>
                    <div>
                        <PicUserProfile />
                        <div>
                            <input type="file" onChange={handleChangePic} />
                            <button className="btn-change-picc" onClick={handleUpload}>Change picture</button>
                        </div>
                        <div className="succes-change-pic">
                            {succesMessagePic && <Alert severity="success">{succesMessagePic}</Alert>}
                            {errorMessagePic && <Alert severity="error">{errorMessagePic}</Alert>}
                        </div>
                    </div>
            </div>
                    <div className="form-change">
                            <Formik
                            initialValues={initialValues}
                            validationSchema={userChangeData}
                            onSubmit={(values, {resetForm}) => {
                            handleUpdate(values, resetForm)
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
                                                <Field name="Name" component={InputFormLogin} />
                                                <Field name="Surname" component={InputFormLogin} />
                                                <Field name="Email" component={InputFormLogin} />
                                                <Field name="Phone" component={InputFormLogin} />

                                                <div className="bio-form">
                                                    <label htmlFor="Bio">Bio</label>
                                                        <textarea className="text-area"  
                                                        name="Bio"
                                                        placeholder={infoUser.Bio}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}/>
                                                    <div> {touched.Bio && errors.Bio} </div>
                                                </div>

                                                <div className="succes-form-change">
                                                    {succesMessage && <Alert severity="success">{succesMessage}</Alert>}
                                                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                                                </div>

                                                <div className='button-change'> 
                                                    {loader ? <div className="circular-register"><CircularProgress /></div> : 
                                                    <button className="input-submit-profile" type="submit" disabled={!(dirty && isValid)}>Save Changes</button>}
                                                    <NavLink to="/profile">
                                                        <button className="input-cancel-profile">Cancel</button>
                                                    </NavLink>
                                                </div>
                                            </Form>
                                    </div>
                                    );
                                }}
                            </Formik>
                    </div>
        </div>
    )
};