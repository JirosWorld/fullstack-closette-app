import React, {createContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import Loader from "../components/loader/Loader";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const history = useHistory();
    const [ authState, setAuthState ] = useState({
        user: null,
        status: 'pending',
    });

    function isTokenValid(jwtToken) {
        const decodedToken = jwt_decode(jwtToken);
        const expirationUnix = decodedToken.exp; // UNIX timestamp

        const now = new Date().getTime(); // javascript timestamp
        const currentUnix = Math.round(now / 1000); // nu ook een UNIX timestamp

        const isTokenStillValid = expirationUnix - currentUnix > 0;

        return isTokenStillValid;
    }

    useEffect(() => {
        const token = localStorage.getItem('closetteToken');

        if(!authState.user && token && isTokenValid(token)) {
            const decodedToken = jwt_decode(token);

            fetchUserData(token, decodedToken.sub);
        } else {
            setAuthState({
                user: null,
                status: 'done',
            });
        }
    }, []);

    function loginFunction(jwtToken) {
        console.log(jwtToken);
        localStorage.setItem('closetteToken', jwtToken);
        const decodedToken = jwt_decode(jwtToken);
        console.log(decodedToken);
        const userId = decodedToken.sub;

        fetchUserData(jwtToken, userId);
    }

    async function fetchUserData(token, id) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result);

            setAuthState({
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                    avatar: result.data.avatar,
                    // als je ook rollen hebt, plaats je die er ook bij!
                },
                status: 'done',
            });

            setTimeout(() => {
                history.push("/");
            }, 3000);

        } catch(e) {
            console.error(e);
        }
    }

    function logoutFunction() {
        console.log('logout!');
        setAuthState({
            user: null,
            status: 'done',
        })
    }

    const data = {
        ...authState,
        login: loginFunction,
        logout: logoutFunction,
    };

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <Loader />
                : children
            }
            {/*{authState.status === 'done'*/}
            {/*    ? children*/}
            {/*    : <Loader />*/}
            {/*}*/}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;