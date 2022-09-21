import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import "./SearchPage.css";

export const SearchPage = () => {
    return(
        <div className="search-page-body">
            <div className="title-search">
                <h1>Search</h1>
                <p>Start looking for your life partner</p>
            </div>
            <SearchBar />
            <Sidebar />
        </div>
    )
}