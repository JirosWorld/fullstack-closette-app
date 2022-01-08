import React, {createContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import Loader from "../components/loader/Loader";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })

    // 'closing'
    useEffect(() => {

        setAuthState({
            user: null,
            status: 'done',
        })
    }, []);

    async function loginFunction(jwtToken) {
        console.log("Resultaat JWT token, daarna de Decoded:");
        console.log(jwtToken);
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;
        console.log(decoded);
        localStorage.setItem('closetteToken', jwtToken);


        try {
            const result = await axios.get(`http://localhost:3000/600/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            });
            console.log(result);

            setAuthState({
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                    avatar: result.data.avatar,
                },
                status: 'done',
            });

            setTimeout(() => {
                history.push("/dashboard");
            }, 3000);

        } catch (e) {
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
            {authState.status === 'done'
                ? children
                : <Loader />
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;