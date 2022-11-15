import "./NavbarNoLogin.css";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { ModalSignIn, ModalSignUp } from "../";
import { ButtonSignIn, ButtonSignUp } from "../../UIkits";


export const NavbarNoLogin = () => {
    const [signInModal, setSignInModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);

    return (
        <div>
            <nav className="navbar-home-nologin">
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">
                <span>Home</span>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/search">
                <span>Search</span>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/blog">
                <span>Blog</span>
            </NavLink>
            </nav>
            <div className="btns-sign">
                <div onClick={() => setSignInModal(!signInModal)}>
                    <ButtonSignIn />
                </div>
                <div onClick={() => setSignUpModal(!signUpModal)}>
                    <ButtonSignUp />
                </div>
            </div>

            {signInModal && <ModalSignIn 
            setSignInModal={setSignInModal} 
            setSignUpModal={setSignUpModal}
            />}
            {signUpModal && <ModalSignUp 
            setSignUpModal={setSignUpModal}
            setSignInModal={setSignInModal} 
            />}
        </div>
    )
}