import "./PetPage.css";
import { useEffect, useState, useContext } from "react";
import { userContext } from '../../Context/userContext';
import { fetchUrl, fetchUrlPost } from "../../Lib/axios";
import { NavLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';


export const PetPage = () => {
    const { infoUser, fetchMe } = useContext(userContext);
    const [petInfo, setPetInfo] = useState({});
    const [foster, setFoster] = useState("")
    const [adopt, setAdopt] = useState("")
    const [save, setSave] = useState("")
    const [unsave, setUnsave] = useState("")
    const [returned, setReturned] = useState("")
    const [succesMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [petId, setPetId] = useState([]);

    const parsedUrl = (new URL(window.location.href)).toString();
    var url = parsedUrl.split( '/' );
    const id = url[url.length - 1];
    const [color, setColor] = useState("");
    const route = `/editPet/${id}`;

    useEffect(() => {
        if(id){
            fetchUrl(`/pets/${id}`)
                .then((val) => {
                    setPetInfo(val)
                    if(val.AdoptionStatus === "Fostered" ){
                        setColor("red");
                        setFoster("true");
                    } else if(val.AdoptionStatus === "Adopted"){
                        setFoster("true");
                        setAdopt("true");
                        setColor("red");
                    } else if(val.AdoptionStatus === "Available"){
                        setColor("green")
                    }
                })
        } if(infoUser.SavePets){
            (infoUser.SavePets).map((info) => {
                if(info._id === id)
                {setSave("true")}
            });
        } if(infoUser.PetsOwn){
            (infoUser.PetsOwn).map((info) => {
                if(info._id === id)
                {setReturned("true")}
            })
        }
    }, [])

    const handleAdopt = () => {
        fetchUrlPost(`/pets/${id}/adopt`).then((val) => {
            console.log(val)  
            fetchMe()
        }).catch((err) => { console.log(err)})
    }

    const handleFoster = () => {
        fetchUrlPost(`/pets/${id}/foster`).then((val) => {
            console.log(val)  
            fetchMe()
        })
    }

    const handleSave = () => {
        fetchUrlPost(`/pets/${id}/save`).then((val) => {
            console.log(val)  
            fetchMe()
        })
    }

    const handleReturn = () => {
        fetchUrlPost(`/pets/${id}/return`).then((val) => {
            console.log(val)  
            fetchMe()
        })
    }

    const handleUnsave = () => {
        fetchUrlPost(`/pets/${id}/unsave`).then((val) => {
            console.log(val)  
            fetchMe()
        })
    }

    return(
        <div className="my-pets-page">
            <div className="title-mypets">
                <h1>Pet Profile</h1>
                <p>Here you can see all the information of the pet.</p>
            </div>
            <div className="imp-info-pet">
                <img src={petInfo.Avatar || "https://www.seekpng.com/png/full/76-760047_zoinks-points-for-education-scooby-doo-images-scooby.png"} alt="pet-picture" className="my-pet-pic"/>
                <p>{petInfo.Name}</p>
                <div className="status-box">
                    <p>Adoption Status:</p>
                    <p style={{ color: color }} >{petInfo.AdoptionStatus}</p>
                </div>
                <div className="btn-box-pet">
                    <button  onClick={handleFoster} disabled={foster}>Foster</button>
                    <button onClick={handleAdopt} disabled={adopt}>Adopt</button>
                </div>
            </div>
            <div className="status-info-pet">
                <h2>Information of {petInfo.Name}</h2>
                <div className="box-info-pet">
                    <div>
                        <p>Type: {petInfo.Type}</p>
                        <p>Breed: {petInfo.Breed}</p>
                        <p>Height: {petInfo.Height}</p>
                        <p>Weight: {petInfo.Weight}</p>
                    </div>
                    <div>
                        <p>Color: {petInfo.Color}</p>
                        <p>Hypoallergenic: {petInfo.Hypoallergenic}</p>
                        <p>Dietary Restrictions: {petInfo.DietaryRestrictions}</p>
                        <p>Bio: {petInfo.Bio}</p>
                    </div>
                </div>
            </div>
            <div className="succes-form-info-pet">
                {succesMessage && <Alert severity="success">{succesMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </div>
            <div className="box-btn-info-pet">
                {save ? <button onClick={handleUnsave}>Unsave Pet</button>
                :
                <button onClick={handleSave}>Save Pet</button>
                }
            </div>
             <div className="return-pet-btn">
                 {returned && <button onClick={handleReturn}>Return Pet</button>}
            </div>
            {infoUser.Permissions?.includes("admin") &&
            <NavLink to={route}>
                <div className="edit-btn-pet">
                    <button>Edit Pet</button>
                </div> 
            </NavLink>
            }
        </div>
    )
};