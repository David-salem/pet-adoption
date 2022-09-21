import "./Header.css";

export const Header = () => {
    return (
        <div>
            <div className="homePage-title">
                    <h1>Adopt. </h1>
                    <h1>Don't shop. </h1>
                    <p>Open your doors and hearts to pets in need of a home and it will be thankfull to you for the rest of your life.</p>
                </div>
                <div className="explore-home">
                    <p>Explore  <i className="fa-solid fa-arrow-right-long"></i></p>
                </div>
                <div className="card-home">
                    <h3>How to adopt a dog: 6 easy steps</h3>
                    <p>Locate the nearby dog shelter and visit the place several times keeping in mind who you want in your home. Here are some shelters you can...</p>
                    <p align="right"><a href="">Read More</a></p>
                </div>
        </div>
    );
};