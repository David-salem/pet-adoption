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
    const [petInfo, setPetInfo] = useState({});
    
    const fetchMe = () => {
        fetchUrl('/users/me')
        .then((u) => {
            setInfoUser(u)
        })
        .catch(setInfoUser({}));
    };

    const fetchPet = (id) => {
        fetchUrl(`/pets/${id}`)
        .then((u) => {
            setPetInfo(u)
            console.log(u);
        })
        .catch(setPetInfo({}));
    };

    useEffect(() => {
        if (isLogin) {
            fetchMe()
        } else setInfoUser({})
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
        infoUser,
        fetchMe,
        fetchPet,
        petInfo
    }

    return (
        <Provider value={value}>
            {children}
        </Provider>
    )
}