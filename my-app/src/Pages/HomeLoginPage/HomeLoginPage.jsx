import "./HomeLoginPage.css"
import { Logo } from "../../Ukits/Logo/Logo";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { HeaderHomePage } from "../../Components/HeaderHomePage/HeaderHomePage";

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