import React, {useContext, useState} from 'react';
import {
    NavLink, Link
} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./TopNav.css";
import LogoNav from "../../assets/img/logo-toilet-nav.png";
import Hamburger from "./Hamburger";

function TopNav({children}) {

    const {user} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);
    const [isClassActive, setClassActive] = useState(false);

    const toggleClass = () => {
        setClassActive(!isClassActive);
    };

    return (

        <div className="top-nav">
            <div className={`top-nav__navigation ${isClassActive ? 'open': null}`} onClick={toggleClass}>
                <Link to="/"><img src={LogoNav} width="200" height="75" alt="toiletroll logo" className="closette-logo"/></Link>
                <ul>
                    <li><NavLink to="/" exact activeClassName="active-link">Home</NavLink></li>
                    <li><NavLink to="/search" activeClassName="active-link">Zoeken</NavLink></li>
                    {user && <li>
                        <NavLink to="/submit" activeClassName="active-link">Toevoegen</NavLink>
                    </li>}
                    <li><NavLink to="/news" activeClassName="active-link">Nieuws</NavLink></li>
                    <li><NavLink to="/contact" activeClassName="active-link">Contact</NavLink></li>
                    {user ?
                        <li>
                            <NavLink to="/dashboard" onClick={logout}
                                     activeClassName="active-link">Uitloggen</NavLink>
                        </li>
                        : <li>
                            <NavLink to="/login"
                                     activeClassName="active-link">Inloggen</NavLink>
                        </li>}
                    {user ? <li>
                        <NavLink to="/dashboard"
                                 activeClassName="active-link">Dashboard</NavLink>
                    </li>
                    :
                        <NavLink to="/signup"
                                 activeClassName="active-link">Registreren</NavLink>
                    }
                </ul>
                <div className={`top-nav__hamburger ${isClassActive ? 'open': null}`} onClick={toggleClass}>
                    <Hamburger />
                </div>
            </div>
        </div>
    );
}

export default TopNav;
