import "./HomePage.css";
import { Slider, Header } from "../../Components";
import { Logo } from "../../UIkits";

export const HomePage = () => {
    return (
        <div className="homePage">
            <div className="main-section-left">

            <Logo />

            <Header />

            </div>
            <div className="main-section-right">
                <Slider />
            </div>
        </div>
    )
}