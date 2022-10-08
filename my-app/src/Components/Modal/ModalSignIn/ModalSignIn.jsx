import React from 'react';
import "./ModalSignIn.css";
import { CatAnimation } from '../../../Ukits/CatAnimation/CatAnimation';
import { FormLogin } from '../../../Ukits/Form/FormLogin';


export const ModalSignIn = ({setSignInModal, setSignUpModal}) => {
    return (
        <div>
            <div className='modal-backdrop' onClick={() => setSignInModal(false)}></div>
                <div className='box-signIn' align="center">
                    <div className='iconx' onClick={() => setSignInModal(false)}>
                        <i className="fa-solid fa-x"></i>
                    </div>
                    <h2>Sign In</h2>
                    <div className='form-modal-signin'>
                        <FormLogin />
                    </div>
                </div>
            <div className='box-modal'>
                <div className='register-modal' align="center">
                    <h1>Welcome Back!</h1>
                    <CatAnimation />
                    <hr />
                    <p>Don't you have an account?</p>
                    <div className="btn btn-one-in" onClick={() =>{ setSignUpModal(true);setSignInModal(false)}}>
                        <span>Register</span>
                    </div>
                </div>
            </div>
        </div>
    );
};