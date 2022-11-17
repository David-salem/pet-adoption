import "./MyPetPage.css";
import {  useContext, useState, useEffect } from "react";
import { userContext } from '../../Context/userContext';
import { HeaderMyPets } from "../../Components";
import { fetchUrl } from "../../Lib/axios";
import { MultiActionAreaCard } from "../../Components";
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



export const MyPetPage = () => {
    const { infoUser } = useContext(userContext);
    const [pet, setPet] = useState("")
    const [data, setData] = useState([]);
    const [dataSave, setDataSave] = useState([]);
    const [change, setChange] = useState("false")

    useEffect(() => {
        if(infoUser.PetsOwn  && infoUser.SavePets) 
        {setPet(true)
        setData(infoUser.PetsOwn)
        setDataSave(infoUser.SavePets)
        setPet("true")}
        else{setPet("false")}
    }, [])

    return (
        <div className="pet-page">
            <h1>My pets</h1>
            <div>
                {pet ? <div> 
                    <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label="Switch Pets"
                labelPlacement="start"
                className="btn-switch-pet"
                onClick={() => setChange(!change)}
            />
                    {/* <button type="checkbox" onClick={() => setSwith(!swith)} className="btn-switch-pet">change</button> */}
                        {change ? 
                            <div className="owned-pets">
                            <h3>Pets Owned</h3>
                            <Grid container spacing={1}>
                                { data.map((pet) => (
                                <MultiActionAreaCard 
                                key={ pet._id }
                                id={ pet._id }
                                avatar={ pet.Avatar }
                                name={ pet.Name }
                                breed={ pet.Breed }
                                bio={ pet.Bio }
                                AdoptionStatus={ pet.AdoptionStatus }
                                />
                            )) }
                            </Grid>
                            </div> : 
                            <div className="owned-pets">
                            <h3>Pets Saved</h3>   
                            <Grid container spacing={1}>
                                { dataSave.map((pet) => (
                                <MultiActionAreaCard 
                                key={ pet._id }
                                id={ pet._id }
                                avatar={ pet.Avatar }
                                name={ pet.Name }
                                breed={ pet.Breed }
                                bio={ pet.Bio }
                                AdoptionStatus={ pet.AdoptionStatus }
                                />
                                )) }
                                </Grid>
                            </div> 
                        }
                </div>
                :
                <HeaderMyPets />
                }
            </div>
        </div>
    );
}
