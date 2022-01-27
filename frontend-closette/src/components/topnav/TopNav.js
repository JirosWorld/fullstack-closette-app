import React, {useContext, useState} from 'react';
import {
    NavLink, Link
} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./TopNav.css";
import LogoNav from "../../assets/img/logo-toilet-nav.png";
import Hamburger from "./Hamburger";
import Avatar from "../../assets/icons/icon-lines-user-jiro.svg";
import IconLogout from "../../assets/icons/icon-lines-logout.svg";

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

                    {user ? <li className="dashboard-link__align">
                            <img src={Avatar} alt="thumbnail"
                                 className="thumbnail-wide transparent" height="20"
                                 width="25"/>
                            <NavLink to="/dashboard"
                                     activeClassName="active-link">
                                Dashboard</NavLink>
                        </li>
                        :
                        <li>
                            <NavLink to="/signup"
                                    activeClassName="active-link">Registreren</NavLink></li>
                    }
                    
                    {user ?
                        <li  className="dashboard-link__align">
                            <img src={IconLogout} alt="thumbnail"
                                 className="thumbnail-wide transparent" height="20"
                                 width="25"/>
                            <NavLink to="/login" onClick={logout}
                                     activeClassName="active-link">Uitloggen</NavLink>
                        </li>
                        : <li>
                            <NavLink to="/login"
                                     activeClassName="active-link">Inloggen</NavLink>
                        </li>}

                </ul>
                <div className={`top-nav__hamburger ${isClassActive ? 'open': null}`} onClick={toggleClass}>
                    <Hamburger />
                </div>
            </div>
        </div>
    );
}

export default TopNav;
