import { useState } from "react";
import "./SearchBar.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdvanceOption } from "../AdvancedOption/AdvanceOption";


export const SearchBar = () => {
    const [advance, setAdvance] = useState(false);

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
                <input type="search" className="search-input"  placeholder="Search..." />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                    defaultValue = ""
                    labelId="demo-simple-select-label"
                    label="Category"
                    id="demo-simple-select"
                    className="select-search"
                    >
                        <MenuItem value={10}>Dogs</MenuItem>
                        <MenuItem value={20}>Cats</MenuItem>
                    </Select>
                </FormControl>
                <p className="btn-search">Search</p>
            </form>
            {advance && <AdvanceOption />}
        </div>
    )
}