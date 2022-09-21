import './App.css';
import { HomePage } from "./Pages/HomePage/HomePage";
import { Navbar } from "./Components/Navbar/Navbar";
import { HomeLoginPage } from "./Pages/HomeLoginPage/HomeLoginPage";
import { Routes, Route } from "react-router-dom";
import { SearchPage } from "./Pages/SearchPage/SearchPage";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { Logo } from "./Ukits/Logo/Logo";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { ButtonLogout } from "./Ukits/Button/ButtonLogout/ButtonLogout";
import { ContactPage } from "./Pages/ContactPage/ContactPage"
import { PetsPage} from "./Pages/PetsPage/PetsPage";
import { PageNotFound } from "./Pages/PageNotFound/PageNotFound.jsx";

const App = () => {
  return (
    <div>
      <Logo />
      <Sidebar />
      <Navbar />
      {/* <HomeLoginPage /> */}
      {/* <HomePage /> */}
        <ButtonLogout />
      <Routes>
        <Route path="/" element={   <HomePage />  } />
        <Route path="/search" element={ <SearchPage/> } />
        <Route path="/profile" element={ <ProfilePage/> } />
        <Route path="/contact" element={ <ContactPage/> } />
        <Route path="/my-pets" element={ <PetsPage/> } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;