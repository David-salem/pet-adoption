import { useState } from "react";
import "./SearchBar.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { fetchUrl } from "../../Lib/axios";
import { MultiActionAreaCard } from "../../Components";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export const SearchBar = () => {
    const [advance, setAdvance] = useState(false);
    const [data, setData] = useState([]);
    const [type, setType] = useState("Dog");
    const [text, setText] = useState("");
    const [height, setHeight] = useState([1, 50]);
    const [weight, setWeight] = useState([1, 50]);
    const [status, setStatus] = useState("Available");

    const handleChangeHeight = (event, newValue) => {
        setHeight(newValue);
      };
    
      const handleChangeWeight = (event, newValue) => {
        setWeight(newValue);
      };
    
    const handleSearchAdvanced = (e) => {
        e.preventDefault();
        if(advance)
        {fetchUrl(`/pets?Type=${type}&&Name=${text}&&AdoptionStatus=${status}&&Height=${height}&&Weight=${weight}`).then((val) => {
            console.log(val)
            setData(val)});
        } else {
            fetchUrl(`/pets?Type=${type}`).then((val) => {
                console.log(val)
                setData(val)});
        }
    };

    return (
        <div className="search-bar">
            <FormControlLabel
            value="start"
            control={<Switch color="primary" />}
            label="Adavanced Search"
            labelPlacement="start"
            className="btn-switch"
            onClick={ () => setAdvance(!advance)}
            />
            <form className="form-search"> 
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                    defaultValue = "Dog"
                    labelId="demo-simple-select-label"
                    label="Category"
                    id="demo-simple-select"
                    className="select-search"
                    required
                    onChange={ (e) => setType(e.target.value)}
                    >
                        <MenuItem selected={true} value="Dog">Dog</MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                    </Select>
                </FormControl>
                <button type="submit" onClick={handleSearchAdvanced} className="btn-search">Search</button>
            </form> 
                {advance && 
                                <div className="advance-box">
                                <form>
                                    <div className="name-adoption">
                                        <h3>Name</h3>
                                        <input type="search" className="search-input"  placeholder="Search..." onChange={(e) => setText(e.target.value)}/>
                                        <h3>Adoption Status</h3>
                                        <Select
                                        defaultValue = "Available"
                                        labelId="demo-simple-select-label"
                                        label="Category"
                                        id="demo-simple-select"
                                        className="select-search"
                                        required
                                        onChange={ (e) => setStatus(e.target.value)}
                                        >
                                            <MenuItem selected={true} value="Available">Available</MenuItem>
                                            <MenuItem value="Foster">Foster</MenuItem>
                                            <MenuItem value="Adopted">Adopted</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="height-weight">
                                        <h3>Height</h3>
                                        <Box sx={{ width: 200 }}>
                                            <Slider
                                                getAriaLabel={() => 'Temperature range'}
                                                value={height}
                                                onChange={handleChangeHeight}
                                                valueLabelDisplay="auto"
                                            />
                                        </Box>
                                        <h3>Weight</h3>
                                        <Box sx={{ width: 200 }}>
                                            <Slider
                                                getAriaLabel={() => 'Temperature range'}
                                                value={weight}
                                                onChange={handleChangeWeight}
                                                valueLabelDisplay="auto"
                                            />
                                        </Box>
                                    </div>
                                </form>
                            </div>
                }
            <div className="pet-card">
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
            </div>
        </div>
    )
};