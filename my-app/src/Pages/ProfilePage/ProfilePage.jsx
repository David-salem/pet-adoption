import "./ProfilePage.css";
import { useContext } from 'react';
import { Sidebar } from "../../Components";
import { PicUserProfile } from "../../UIkits";
import { userContext } from '../../Context/userContext';
import { Link } from "react-router-dom";

export const ProfilePage = () => {
    const { infoUser } = useContext(userContext);

    return (
        <div className="profile-page">
            <Sidebar />
            <h1>My profile</h1>
            <p>Here is your personal information.</p>
            <div className="pic-profilepage">
                <h2>Your profile picture</h2>
                    <div>
                        <PicUserProfile />
                    </div>
            </div>
            <form className='form-profile-signin'>
                    <h4>
                        Name
                    </h4>
                    <p>{infoUser.Name} </p> 
                    <h4>
                        Last Name
                    </h4>
                    <p>{infoUser.Surname} </p> 
                    <h4>
                        Email
                    </h4>
                    <p>{infoUser.Email} </p>
                    <h4>
                        Phone Number
                    </h4>
                    <p>{infoUser.Phone} </p> 
                    <div className="add-bio">
                        <h4>
                            Your bio
                        </h4>
                        <p>{infoUser.bio ? infoUser.bio : "You dont have anything yet"}</p> 
                    </div>
                    <div className="btn-contact-page">
                        <Link to="/change-page"> <button className="input-submit-profile"> <i className="fa-solid fa-pen-to-square fa-fw"></i>Edit profile</button></Link>
                        <button className="input-submit-profile"><i className="fa-solid fa-pen-to-square fa-fw"></i>Change Password</button>
                    </div>
            </form>
        </div>
    )
}