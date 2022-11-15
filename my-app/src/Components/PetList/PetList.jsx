import "./PetList.css";
import { useEffect, useState } from "react";
import { fetchUrl } from "../../Lib/axios";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'Avatar', headerName: '', width: 70, sortable: false,
    renderCell: (params) => <img className="pic-pet-cell" alt="pet-pic" src={params.value} />},
    { field: 'Name', headerName: 'Name', width: 100, sortable: false},
    { field: 'Type', headerName: 'Type', width: 75, sortable: false },
    { field: 'Breed', headerName: 'Breed', width: 140, sortable: false },
    { field: 'Color', headerName: 'Color', width: 100, sortable: false},
    { field: 'AdoptionStatus', headerName: 'Adoption Status', width: 120, sortable: false },
    { field: 'Height', headerName: 'Height', width: 75, sortable: false },
    { field: 'Weight', headerName: 'Weight', width: 75, sortable: false },
    { field: 'Hypoallergenic', headerName: 'Hypoallergenic', width: 130, sortable: false },
    { field: 'DietaryRestrictions', headerName: 'Dietary Restrictions', width: 150, sortable: false },
    { field: '_id', headerName: 'Action', width: 250, sortable: false,
    renderCell: (params) => <a href={`http://localhost:3000/pets/${params.value}`} className="pet-link">Pet Page</a>
},
];

export const PetList = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetchUrl("/pets/all").then((val) =>{
            setPets(val)
        }).catch(err => {console.log(err.message)})
    }, [pets])

    return (
            <div className="nombres">
                <DataGrid
                rows={pets}
                sortingOrder={['desc', 'asc']}
                initialState={{
                sorting: {
                    sortModel: [
                    {
                        field: 'Name',
                        sort: 'asc',
                    },
                    ],
                },
                }}
                columns={columns}
                throttleRowsMs={0}
                autoPageSize
                disableSelectionOnClick
                loading={pets.length === 0}
                getRowId={(row) => row._id} 
                />
            </div>
    )
};