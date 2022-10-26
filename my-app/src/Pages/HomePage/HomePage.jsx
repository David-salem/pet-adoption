import { useState } from "react";
import "./HomePage.css";
import { Slider, Header, ModalSignIn, ModalSignUp } from "../../Components";
import { ButtonSignIn, ButtonSignUp, Logo } from "../../UIkits";

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