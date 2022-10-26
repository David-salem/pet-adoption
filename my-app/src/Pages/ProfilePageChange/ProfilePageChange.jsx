import "./ProfilePageChange.css";
import { useContext } from 'react';
import { Sidebar } from "../../Components";
import { PicUserProfile } from "../../UIkits/PicUserProfile/PicUserProfile";
import { userContext } from '../../Context/userContext';

export const ProfilePageChange = () => {
    const { infoUser } = useContext(userContext);

    return (
        <div className="profile-page">
            <Sidebar />
            <h1>change things</h1>
            <p>Manage the settings of your profile</p>
            <div className="pic-profilepage">
                <h2>Your profile picture</h2>
                    <div>
                        <PicUserProfile />
                        <div>
                            <p>Upload new picture</p>
                            <p>Change picture</p>
                        </div>
                    </div>
            </div>
            <form className='form-profile-signin'>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" id="name" placeholder={infoUser.Name}/>
                    <label htmlFor="last-name">
                        Last Name
                    </label>
                    <input type="text" id="last-name" placeholder={infoUser.Surname}/>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" id="email" placeholder={infoUser.Email}/>
                    {/* <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password"/> */}
                    <label htmlFor="tel">
                        Phone Number
                    </label>
                    <input type="tel" id="tel" placeholder={infoUser.Phone}/>
                    <div className="add-bio">
                        <label htmlFor="bio">
                             Add bio 
                        </label>
                        <textarea id="bio" placeholder={infoUser.Bio}/>
                    </div>
            </form>
                    {/* <button className="input-submit-profile-change" onClick={handleChange}>Save Changes</button> */}
        </div>
    )
}