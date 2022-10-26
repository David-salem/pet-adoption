import "./HomeLoginPage.css"
import { Logo } from "../../UIkits";
import { Sidebar, HeaderHomePage } from "../../Components";

export const HomeLoginPage = () => {
    return (
        <div className="homepage-login">
            <div className="pic-homepage">
            </div>
            <HeaderHomePage />
            <Logo />
            <Sidebar />
        </div>
    );
}