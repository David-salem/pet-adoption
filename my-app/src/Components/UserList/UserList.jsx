import "./UserList.css";
import { useEffect, useState } from "react";
import { fetchUrl } from "../../Lib/axios";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'Name', headerName: 'Name', width: 130 },
    { field: 'Surname', headerName: 'Last Name', width: 130 },
    { field: 'Email', headerName: 'Email', width: 250 },
    { field: 'Phone', headerName: 'Phone', width: 130 },
    { field: 'Permissions', headerName: 'Permissions', width: 200 },
    { field: '_id', headerName: 'Id', width: 200 },
    { field: 'Bio', headerName: 'Bio', width: 254 },
];

export const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUrl("/users/").then((val) =>{
            setUsers(val);
        })
    }, [])

    return (
            <div className="nombres">
                <DataGrid
                rows={users}
                columns={columns}
                disableSelectionOnClick
                pageSize={12}
                loading={users.length === 0}
                getRowId={(row) => row._id} 
                />
            </div>
    )
};