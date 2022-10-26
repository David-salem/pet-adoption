import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeIsLoggedIn, storeLogout, storeLogin } from "../Auth/tokenService";
import { fetchUrl } from "../Lib/axios";

export const userContext = createContext({});
const Provider = userContext.Provider;

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(storeIsLoggedIn());
    const [infoUser, setInfoUser] = useState({});
    
    useEffect(() => {
        if (isLogin) {
            fetchUrl('/users/me')
                .then((u) => {
                    setInfoUser(u)
                })
                .catch(setInfoUser({}));
        } 
    }, [isLogin])

    const login = (token) => {
        storeLogin(token);
        setIsLogin(storeIsLoggedIn());
        navigate('/');
    }

    const logout = () => {
        storeLogout();
        setIsLogin(storeIsLoggedIn());
        navigate('/');
    }

    const value = {
        isLogin,
        login,
        logout,
        infoUser
    }

    return (
        <Provider value={value}>
            {children}
        </Provider>
    )
}