import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })

    useEffect(() => {
        // check of er nog een token in Local Storage staat
        // ZO JA: haal dan de nieuwe data op en zet deze in de state:
        setAuthState({
            user: {
                username: 'admin',
                email: 'jiro@jirosworld.com',
                id: 1,
            },
            status: 'done',
        });

        // ZO NEE:
        setAuthState({
            user: null,
            status: 'done',
        });

    }, []);

    const data = {
        ...authState,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;