import "./HeaderMyPets.css";
import { Link } from 'react-router-dom';

export const HeaderMyPets = () => {
    return (
        <div className="mypets-box" align="center">
            <div className="pic-mypets"></div>
            <h2>Looks like you currently don't own or foster any pets.</h2>
            <div style={{display : 'flex'}}>
                <p>Your pet is waiting for you,</p> 
                <Link to="/search">start now</Link>
            </div>
        </div>
    );
}