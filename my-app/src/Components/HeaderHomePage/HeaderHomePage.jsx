import "./HeaderHomePage.css";
import { useContext } from 'react';
import { userContext } from '../../Context/userContext';

export const HeaderHomePage = () => {
    const { infoUser } = useContext(userContext);

    return(
        <div className="header-homepage-login">
            <h1>Welcome {infoUser.Name} {infoUser.Surname}</h1>
        </div>
    )
}