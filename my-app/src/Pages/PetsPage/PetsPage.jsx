import "./PetsPage.css";
import { HeaderMyPets } from "../../Components";

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
