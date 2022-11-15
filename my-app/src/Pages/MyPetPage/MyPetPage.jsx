import "./MyPetPage.css";
import { HeaderMyPets } from "../../Components";

export const MyPetPage = () => {
    return (
        <div className="pet-page">
            <h1>My pets</h1>
            <div>
                <HeaderMyPets />
            </div>
        </div>
    );
}
