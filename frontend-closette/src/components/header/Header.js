import React from 'react';
import {ReactComponent as Logo} from "../../logo.svg";
import "./Header.css"

function Header({title}) {
    return (
        <>
            <header>
                <div className="title-container">
                    <Logo className="logo" alt="toiletroll logo"/>
                    <h1>{title}</h1>
                </div>
            </header>
        </>
    );
}

export default Header;
