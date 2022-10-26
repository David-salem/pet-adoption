import './App.css';
import { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { HomePage, HomeLoginPage, SearchPage, ProfilePage, ContactPage, PageNotFound, ProfilePageChange, AdminPage, ManagePets, PetsPage } from "./Pages";
import { Navbar, Sidebar } from "./Components";
import { Logo, ButtonLogout } from "./UIkits";
import { userContext } from './Context/userContext';
import { SecureRoute } from './Auth/SecureRoute';

const App = () => {
  const { isLogin } = useContext(userContext);

  return (
    <div>
      {
        isLogin ? 
        <div>
          <ButtonLogout />
          <Logo />
          <Sidebar />
          <Navbar />
          <Routes>
            <Route path="/" element={ <HomeLoginPage /> } />
            <Route path="/search" element={ <SearchPage/>} />
            <Route path="/admin" element={ <SecureRoute role="admin"> <AdminPage /> </SecureRoute> } />
            <Route path="/manage-pets" element={ <SecureRoute role="admin"> <ManagePets /> </SecureRoute> } />
            <Route path="/profile" element={ <ProfilePage/> } />
            <Route path="/change-page" element={ <ProfilePageChange /> } />
            <Route path="/contact" element={ <ContactPage/> } />
            <Route path="/my-pets" element={ <PetsPage/> } />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        :
        <div>
                < HomePage/> 
        </div>
      }
    </div>
  );
}

export default App;