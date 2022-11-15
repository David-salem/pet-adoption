import "./SearchPage.css";
import { SearchBar } from "../../Components";

export const SearchPage = () => {
    return(
        <div className="search-page-body">
            <div className="title-search">
                <h1>Search</h1>
                <p>Start looking for your life partner</p>
            </div>
            <SearchBar />
        </div>
    )
}