import React, { useContext} from 'react';
import {
    NavLink
} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./TopNav.css";

function TopNav({subredditView, children}) {

    const {user} = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    return (

        <nav>
            <div className="nav-container">
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" activeClassName="active-link">Zoeken</NavLink>
                    </li>
                    {user && <li>
                        <NavLink to="/submit" activeClassName="active-link">Toevoegen</NavLink>
                    </li>}
                    <li>
                        <NavLink to="/news" activeClassName="active-link">Nieuws</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" activeClassName="active-link">Contact</NavLink>
                        <ul>
                            <li><strong>☰</strong></li>
                            {user ?
                                <li>
                                    <NavLink to="/dashboard" onClick={logout} activeClassName="active-link">Uitloggen</NavLink>
                                </li>
                                : <li>
                                <NavLink to="/login"
                                         activeClassName="active-link">Inloggen</NavLink>
                            </li>}
                            <li>
                                <NavLink to="/signup"
                                         activeClassName="active-link">Registreren</NavLink>
                            </li>
                            {user && <li>
                                <NavLink to="/dashboard"
                                         activeClassName="active-link">Dashboard</NavLink>
                            </li>}
                        </ul>
                    </li>
                    {children}
                    <li>
                        <div id="hamburgermenu">
                            <div id="menu"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default TopNav;
