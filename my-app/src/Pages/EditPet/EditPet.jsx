import "./EditPet.css";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchUrl, fetchUrlPut } from "../../Lib/axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { InputAddPet, MyTextArea } from "../../UIkits";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { editPetSchema } from "../../yupValidation/userValidation";


export const EditPet = () => {
    const [petInfo, setPetInfo] = useState({});
    const [photo, setPhoto] = useState(null);
    const [loader, setLoader] = useState(false);
    const [succesMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [succesMessagePic, setSuccessMessagePic] = useState("");
    const [errorMessagePic, setErrorMessagePic] = useState("");
    const [loaderPic, setLoaderPic] = useState(false);
    const navigate = useNavigate();
    
    const parsedUrl = (new URL(window.location.href)).toString();
    var url = parsedUrl.split( '/' );
    const id = url[url.length - 1];
    const route = `/pets/${id}`;

    const fetchPet = () => {
        fetchUrl(`/pets/${id}`)
            .then((val) => {
                setPetInfo(val)
            })
    }

    useEffect(() => {
        fetchPet()
    }, [])

    const initialValues = {
        Name: petInfo.Name ? petInfo.Name : "",
        Type: petInfo.Type ? petInfo.Type : "",
        Breed: petInfo.Breed ? petInfo.Breed : "",
        Height: petInfo.Height ? petInfo.Height : "",
        Bio: petInfo.Bio ? petInfo.Bio : "",
        Weight: petInfo.Weight ? petInfo.Weight : "",
        Color: petInfo.Color ? petInfo.Color : "",
        Hypoallergenic: petInfo.Hypoallergenic ? petInfo.Hypoallergenic : "",
        DietaryRestrictions: petInfo.DietaryRestrictions ? petInfo.DietaryRestrictions : "",
        AdoptionStatus: petInfo.AdoptionStatus ? petInfo.AdoptionStatus : "",
        Avatar: petInfo.Avatar ? petInfo.Avatar : "",
      };

      const handleChangePic = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
          }
    };

    const handleUpload = async() => {
        setLoaderPic(true);
        const formData = new FormData();

        formData.set('avatar', photo);

        return await fetchUrlPut(`/pets/ProfilePic/${petInfo._id}`, formData)
        .then(() => {
            setSuccessMessagePic("Picture uploaded successfully")
            setLoaderPic(false);
        }).catch(err => {
            setErrorMessagePic(err.message);
            setLoaderPic(false);
        })    
    };

    const handleChange = (values, resetForm) => {
        setErrorMessage("");
        setSuccessMessage("");
        setLoader(true);

        fetchUrlPut(
            `/pets/updatePet/${petInfo._id}`, {
                Name: values.Name,
                Type: values.Type,
                Breed: values.Breed,
                Height: values.Height,
                Bio: values.Bio,
                Weight: values.Weight,
                Color: values.Color,
                Hypoallergenic: values.Hypoallergenic,
                DietaryRestrictions: values.DietaryRestrictions,
                AdoptionStatus: values.AdoptionStatus,
            })
        .then(() => {
            setSuccessMessage("Data saved successfully")
            resetForm({values: ""});
            setLoader(false);
            fetchPet()
            setTimeout(() => {
                console.log(petInfo)
                navigate(`/pets/${id}`)
              }, 3000);
        }).catch(err => {
            setErrorMessage(err.message);
            setLoader(false);
        })
    };

    return(
        <div className="my-pets-edit-page">
            <div className="title-mypets">
                <h1>Pet Profile</h1>
                <p>Here you can see all the information of the pet.</p>
            </div>
            <Formik
            enableReinitialize={true} 
            initialValues={initialValues}
            validationSchema={editPetSchema}
            onSubmit={(values, {resetForm}) => {
            handleChange(values, resetForm)
            }}>
                    
                {(formik) => {
                    const {
                    dirty,
                    values,
                    isValid,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    } = formik;

                return (
                    <div>
                            <Form>
                                <div>
                                    <div className="box-name-status">
                                        <Field name="Name" component={InputAddPet} />
                                        <div className="formik-input-container-add-pet">
                                            <label htmlFor="AdoptionStatus">Adoption Status</label>
                                            <input 
                                            type="text" 
                                            name="AdoptionStatus"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={formik.values.AdoptionStatus}
                                            />
                                            <div> {touched.AdoptionStatus && errors.AdoptionStatus} </div>
                                        </div>
                                    </div>
                                    <div className="box-breed-pet">
                                        <Field name="Type" component={InputAddPet} />
                                        <Field name="Breed" component={InputAddPet} />
                                        <Field name="Height" component={InputAddPet} />
                                        <Field name="Weight" component={InputAddPet} /> 
                                    </div>
                                    <div className="box-hypoallergenic">
                                        <Field name="Hypoallergenic" component={InputAddPet} />
                                        <div className="formik-input-container-add-pet">
                                            <label htmlFor="DietaryRestrictions">Dietary Restrictions</label>
                                            <input 
                                            type="text" 
                                            name="DietaryRestrictions"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={formik.values.DietaryRestrictions}
                                            />
                                            <div> {touched.DietaryRestrictions && errors.DietaryRestrictions} </div>
                                        </div>
                                        <div className="formik-input-container-add-pet">
                                            <label htmlFor="Color">Color</label>
                                            <input 
                                            type="text" 
                                            name="Color"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={formik.values.Color}
                                            />
                                            <div> {touched.Color && errors.Color} </div>
                                        </div>
                                        <MyTextArea
                                            label="Bio"
                                            name="Bio"
                                            rows="6"
                                        />
                                    </div>
                                </div>

                                <div className="succes-form-edit-pet">
                                    {succesMessage && <Alert severity="success">{succesMessage}</Alert>}
                                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                                </div>
                                <div className="box-edit-pet-btn">
                                    {loader ? <div className="circular-edit-pet"><CircularProgress /></div> : 
                                    <button
                                    type="submit"
                                    className={!(dirty && isValid) ? "disabled" : ""}
                                    disabled={!(dirty && isValid)}>
                                    Save
                                    </button>}
                                </div>
                            </Form>
                    </div>
                    );
                }}             
            </Formik>
            <div className="imp-info-pet">
                <img src={petInfo.Avatar || "https://www.seekpng.com/png/full/76-760047_zoinks-points-for-education-scooby-doo-images-scooby.png"} alt="pet-picture" className="my-pet-pic-edit"/>
            </div>
            <div className="input-edit">
                <input type="file" onChange={handleChangePic} />
                <button onClick={handleUpload}>Change picture</button>
            </div>
            <div className="succes-edit-pic">
                {succesMessagePic && <Alert severity="success">{succesMessagePic}</Alert>}
                {errorMessagePic && <Alert severity="error">{errorMessagePic}</Alert>}
            </div>

            <div className="status-info-pet-edit">
                <h2>Edit the information of {petInfo.Name}</h2>
            </div>
            <NavLink to={route}>
                <div className="comeback-btn-pet">
                    <button>Come Back</button>
                </div>
            </NavLink>
        </div>
    )
};