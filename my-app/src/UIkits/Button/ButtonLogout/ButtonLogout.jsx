import "./ButtonLogout.css";
import { useContext } from 'react';
import { userContext } from '../../../Context/userContext';

export const ButtonLogout = () => {
    const { logout } = useContext(userContext);

    return (
        <>
            <div className="btn-logout">
                <p onClick={logout}>Log Out</p>  
            </div>
        </>
    )
}