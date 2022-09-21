import "./ContactPage.css";

export const ContactPage = () => {
    return (
        <div className="contact-page">
            <div>
                <h1>Lets talk about everything!</h1>
                <p>Fill up the form and our team will get back to you.</p>
            </div>
            <div className="picture-contact"></div>
            <div className="form-contact-page">
                <form action="">
                    <input type="text" placeholder="Your name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="text" placeholder="Subject"/>
                    <textarea rows="10" cols="15" placeholder="Write your message here..."/>
                    <input type="submit" value="Send Message" className="submit-contact-page"/>
                </form>
            </div>
        </div>
    );
}