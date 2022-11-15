import './App.css';
import { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { HomePage, HomeLoginPage, SearchPage, ProfilePage, ContactPage, PageNotFound, ProfilePageChange, AdminPage, ManagePets, MyPetPage, PetPage, Blog, EditPet } from "./Pages";
import { Navbar, Sidebar, NavbarNoLogin } from "./Components";
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
            {/* <Route path="/manage-pets" element={ <SecureRoute role="admin"> <ManagePets /> </SecureRoute> } /> */}
            <Route path="/profile" element={ <ProfilePage/> } />
            <Route path="/change-page" element={ <ProfilePageChange /> } />
            <Route path="/contact" element={ <ContactPage/> } />
            <Route path="/my-pets" element={ <MyPetPage/> } />
            <Route path="/pets/:_id" element={ <PetPage/> } />
            <Route path="/editPet/:_id" element={ <SecureRoute role="admin"> <EditPet/> </SecureRoute>} />
            <Route path="/blog" element={ <Blog/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        :
        <div>
            <Logo />
            <NavbarNoLogin />
              <Routes>
                <Route path="/" element={ < HomePage/> } />
                <Route path="/search" element={ <SearchPage/>} />
                <Route path="/pets/:_id" element={ <PetPage/> } />
                <Route path="/blog" element={ <Blog/>} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
        </div>
      }
    </div>
  );
}

export default App;