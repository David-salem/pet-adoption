import "./Header.css";
import { NavLink } from 'react-router-dom';

export const Header = () => { 
    return (
        <div>
            <div className="homePage-title">
                    <h1>Adopt. </h1>
                    <h1>Don't shop. </h1>
                    <p>Open your doors and hearts to pets in need of a home and it will be thankfull to you for the rest of your life.</p>
                </div>
                <div className="explore-home">
                    <NavLink to="/search">
                        <p>Explore  <i className="fa-solid fa-arrow-right-long"></i></p>
                    </NavLink>
                </div>
                <div className="card-home">
                    <h3>How to adopt a dog: 6 easy steps</h3>
                    <p>Locate the nearby dog shelter and visit the place several times keeping in mind who you want in your home. Here are some shelters you can...</p>
                    <NavLink to="/blog">
                        <p align="right">Read More</p>
                    </NavLink>
                </div>
        </div>
    );
};