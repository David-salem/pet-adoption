import React from 'react';
import "./ModalSignUp.css";
import { DogAnimation  } from '../../../Ukits/DogAnimation/DogAnimation';

export const ModalSignUp = ({setSignUpModal, setSignInModal}) => {
    return (
        <div>
            <div className='modal-backdrop' onClick={() => setSignUpModal(false)}></div>
                <div className='box-signUp' align="center">
                    <div className='iconx-up'>
                        <i class="fa-solid fa-x" onClick={() => setSignUpModal(false)}></i>
                    </div>
                    <h2>Register</h2>
                <form className="form-modal-signup">
                        <input type="text" placeholder='Name' required/>
                        <input type="text" placeholder='Last Name' required/>
                        <input type="email" placeholder="Email" required/>
                        <input type="password" placeholder="Password" required/>
                        <input type="password" placeholder="Confim Password" required/>
                        <input type="tel" placeholder="Phone Number" required/>
                        <input type="submit" value='Create Account' className='create-btn'/>
                </form>
                </div>
            <div className='box-modal-signup'>
                <div className='signUp-modal' align="center">
                    <h1>Create an account</h1>
                        <DogAnimation />
                    <hr />
                    <p>Already have an account?</p>
                    <div className="btn btn-one" onClick={() =>{ setSignUpModal(false);setSignInModal(true)}}>
                        <span>Sign In</span>
                    </div>
                </div>
            </div>
        </div>
    );
};