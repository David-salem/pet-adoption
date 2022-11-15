import "./ModalAddPet.css";
import { useState } from "react";
import { InputAddPet, MyTextArea } from "../../../UIkits";
import { Formik, Form, Field } from "formik";
import { addPetSchema } from "../../../yupValidation/userValidation";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUrlPost } from "../../../Lib/axios";

export const ModalAddPet = ({setOpenModal}) => {
    const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState();
    const [loader, setLoader] = useState(false);
    const [succesMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangePic = (e) => {
        if (e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]))
            setPhoto(e.target.files[0])
          }
    };

    const submitForm = (values, resetForm) => {
        setErrorMessage("");
        setSuccessMessage("");
        setLoader(true);

        const formData = new FormData();

        formData.append("Name", values.Name)
        formData.append("Type", values.Type)
        formData.append("Breed", values.Breed)
        formData.append("Color", values.Color)
        formData.append("AdoptionStatus", values.AdoptionStatus)
        formData.append("Height", values.Height)
        formData.append("Weight", values.Weight)
        formData.append("Hypoallergenic", values.Hypoallergenic)
        formData.append("DietaryRestrictions", values.DietaryRestrictions)
        formData.append("Bio", values.Bio)
        formData.append("avatar", photo)

        fetchUrlPost("/pets/addPet", formData)
        .then(resp => {
            setSuccessMessage("Pet added successfully")
            resetForm({values: ""});
            setLoader(false);
        }).catch(err => {
            setErrorMessage(err.message);
            setLoader(false);
        })
    }

    const initialValues = {
        Name: "",
        Type: "",
        Breed: "",
        Color: "",
        AdoptionStatus: "",
        Height: "",
        Weight: "",
        Hypoallergenic: "",
        DietaryRestrictions: "",
        Bio: ""
      };

    return (
        <div className="body-modal-add">
            <h1>Add a new pet</h1>
            <div>
                <img src={file || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSatY1_hIhUZMEbKbOZEIkj2307DFs1T1YaEKTVgKDAGt5NsabuoGPUhA4jV2F0_5M1mn8&usqp=CAU"} alt="file" className="preview-pic"/>
                <input 
                type="file" 
                className="input-file" 
                title=" "
                onChange={handleChangePic}
                />
                {/* <Button 
                className="btn-load"
                variant="contained"
                disabled={loading || !photo} onClick={ handleUploadPic }
                >update</Button> */}
            </div>
            <div>
            <Formik
            initialValues={initialValues}
            validationSchema={addPetSchema}
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
                                <div className="box-information-add-pet">
                                    <div>
                                        <Field name="Name" component={InputAddPet} />
                                        <Field name="Breed" component={InputAddPet} />
                                        <Field name="Height" component={InputAddPet} />
                                        <Field name="Weight" component={InputAddPet} /> 
                                        <div className="formik-input-container-add-pet">
                                            <label htmlFor="AdoptionStatus">Adoption Status</label>
                                            <input 
                                            type="text" 
                                            name="AdoptionStatus"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            />
                                            <div> {touched.AdoptionStatus && errors.AdoptionStatus} </div>
                                        </div>
                                    </div>
                                    <div>
                                        {/* <Field name="njdsnf" component="select">
                                            <option value="red">Red</option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue</option>
                                        </Field> */}
                                        <Field name="Type" component={InputAddPet} />
                                        <Field name="Hypoallergenic" component={InputAddPet} />
                                        <div className="formik-input-container-add-pet">
                                            <label htmlFor="DietaryRestrictions">Dietary Restrictions</label>
                                            <input 
                                            type="text" 
                                            name="DietaryRestrictions"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
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

                                <div className="succes-form-add-pet">
                                    {succesMessage && <Alert severity="success">{succesMessage}</Alert>}
                                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                                </div>
                                <div className="box-add-btn">
                                    {loader ? <div className="circular-add-pet"><CircularProgress /></div> : 
                                    <button
                                    type="submit"
                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                    disabled={!(dirty && isValid)}>
                                    Add pet
                                    </button>}
                                </div>
                            </Form>
                    </div>
                    );
                }}             
            </Formik>
            </div>
            <button className="cancel-btn-add" onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
    )
}