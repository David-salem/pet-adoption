import "./ContactPage.css";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export const ContactPage = () => {
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const form = useRef();

    const handleEmail = (e) => {
        setLoader(true);
        setMessage("");
        setError("");
        e.preventDefault();

        emailjs.sendForm('service_cn8916q', 'template_6pe5cpa', form.current, '_dHKUxkDWEQ45ca8T')
          .then(() => {
              setMessage("Your request was successfully submitted.");
              setLoader(false);
              e.target.reset();
          }, (error) => {
              setLoader(false);
              setError(error);
              e.target.reset();
          });
    }

    return (
        <div className="contact-page">
            <div>
                <h1>Lets talk about everything!</h1>
                <p>Fill up the form and our team will get back to you.</p>
            </div>
            <div className="picture-contact"></div>
            <div className="form-contact-page">
                <form ref={form} onSubmit={ handleEmail }>
                    <input type="text" name="user_name" placeholder="Your name" required/>
                    <input type="email" name="user_email" placeholder="Email" required/>
                    <input type="text" name="subject" placeholder="Subject"/>
                    <textarea rows="10" cols="15" name="message" placeholder="Write your message here..." required/>
                    { loader ? <div className="loader-contact"><CircularProgress /></div> :
                    <input type="submit" value="Send Message" className="submit-contact-page"/> 
                }
                {message && <Alert severity="success" className="message-contact">{message}</Alert>}
                {error && <Alert severity="error" className="message-contact">{error}</Alert>}
                </form>
            </div>
        </div>
    );
}