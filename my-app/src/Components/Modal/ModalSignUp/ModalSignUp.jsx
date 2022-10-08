import "./ModalSignUp.css";
import { DogAnimation  } from '../../../Ukits/DogAnimation/DogAnimation';
import { FormRegister } from '../../../Ukits/Form/FormRegister';

export const ModalSignUp = ({setSignUpModal, setSignInModal}) => {
    return (
        <div>
            <div className='modal-backdrop' onClick={() => setSignUpModal(false)}></div>
                <div className='box-signUp' align="center">
                    <div className='iconx-up'>
                        <i className="fa-solid fa-x" onClick={() => setSignUpModal(false)}></i>
                    </div>
                    <h2>Register</h2>
                    <div className="form-register">
                        <FormRegister />
                    </div>
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