import { useState } from "react";
import "./HomePage.css";
import { Slider } from "../../Components/Slider/Slider";
import { ModalSignIn } from "../../Components/Modal/ModalSignIn/ModalSignIn";
import { ModalSignUp } from "../../Components/Modal/ModalSignUp/ModalSignUp";
import { ButtonSignIn } from "../../Ukits/Button/ButtonSignIn/ButtonSignIn";
import { ButtonSignUp } from "../../Ukits/Button/ButtonSignUp/ButtonSignUp";
import { Header } from "../../Components/Header/Header";
import { Logo } from "../../Ukits/Logo/Logo";

export const HomePage = () => {
    const [signInModal, setSignInModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);

    return (
        <div className="homePage">
            <div className="main-section-left">

            <Logo />

            <div onClick={() => setSignInModal(true)}>
                <ButtonSignIn />
            </div>
            <div onClick={() => setSignUpModal(true)}>
                <ButtonSignUp />
            </div>

            {signInModal && <ModalSignIn 
            setSignInModal={setSignInModal} 
            setSignUpModal={setSignUpModal}
            />}
            {signUpModal && <ModalSignUp 
            setSignUpModal={setSignUpModal}
            setSignInModal={setSignInModal} 
            />}

            <Header />

            </div>
            <div className="main-section-right">
                <Slider />
            </div>
        </div>
    )
}