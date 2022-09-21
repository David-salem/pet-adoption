import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./ProfilePage.css";
import { PicUserProfile } from "../../Ukits/PicUserProfile/PicUserProfile";

export const ProfilePage = () => {
    return (
        <div className="profile-page">
            <Sidebar />
            <h1>My profile</h1>
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
                    <input type="text" id="name"/>
                    <label htmlFor="last-name">
                        Last Name
                    </label>
                    <input type="text" id="last-name"/>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" id="email"/>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password"/>
                    <label htmlFor="tel">
                        Phone Number
                    </label>
                    <input type="tel" id="tel"/>
                    <div className="add-bio">
                        <label htmlFor="bio">
                             Add bio 
                        </label>
                        <textarea id="bio"/>
                    </div>
                    <input type="submit" value="Save Changes" className="input-submit-profile"/>
            </form>
        </div>
    )
}