import React from 'react';
import {
    NavLink
} from "react-router-dom";
import "./TopNav.css";

function TopNav({subredditView, children}) {

    return (

        <nav>
            <div id="container">
                <div id="menu"></div>
            </div>
            <div className="nav-container">
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" activeClassName="active-link">Zoeken</NavLink>
                    </li>
                    <li>
                        <NavLink to="/submit" activeClassName="active-link">Toevoegen</NavLink>
                    </li>
                    <li>
                        <NavLink to="/news" activeClassName="active-link">Nieuws</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" activeClassName="active-link">Contact</NavLink>
                        <ul><li><strong>☰</strong></li>
                            <li>
                                <NavLink to="/login" activeClassName="active-link">Inloggen</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup" activeClassName="active-link">Registreren</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink>
                            </li></ul>
                    </li>
                    {children}
                    <li><strong>☰</strong></li>
                </ul>
            </div>
        </nav>
    );
}

export default TopNav;
