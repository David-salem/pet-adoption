import "./PetsPage.css";
import { HeaderMyPets } from "../../Components/HeaderMyPets/HeaderMyPets";

export const PetsPage = () => {
    return (
        <div className="pet-page">
            <h1>My pets</h1>
            <div>
                <HeaderMyPets />
            </div>
        </div>
    );
}
