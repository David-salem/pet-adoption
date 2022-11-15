import "./AdminPage.css";
import { useState } from "react";
import { UserList, PetList, ModalAddPet } from "../../Components";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const AdminPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [toggle, setToggle] = useState(false);

    return (
        <div className="dashboard-body">
            <div>
                <h1>Dashboard</h1>
                <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label="User and Pet List"
                labelPlacement="start"
                className="btn-switch-admin"
                onClick={ () => setToggle(!toggle)}
                />
            </div>
            <div className="user-pet-list">
                <div>
                {toggle ? <UserList /> :
                    <div>
                        <button className="edit-pets-button" onClick={() => setOpenModal(!openModal)}>Add Pet</button>
                        <PetList />
                    </div>}
                    {openModal && <ModalAddPet setOpenModal={setOpenModal}/>}
                </div>
            </div>
        </div>
    )
};