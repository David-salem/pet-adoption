import "./PetPage.css";
import { useEffect, useState, useContext } from "react";
import { userContext } from '../../Context/userContext';
import { fetchUrl } from "../../Lib/axios";
import { NavLink } from 'react-router-dom';

export const PetPage = () => {
    const { infoUser } = useContext(userContext);
    const [petInfo, setPetInfo] = useState({});

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
                    console.log(val)   
                    if(val.AdoptionStatus === "Foster"){
                        setColor("green")
                    } else setColor("red")
                })
        }
    }, [])

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
                    <button>Foster</button>
                    <button>Adopt</button>
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
            <div className="box-btn-info-pet">
                <button>Save Pet</button>
                <button>Unsave Pet</button>
            </div>
             <div className="return-pet-btn">
                <button>Return Pet</button>
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