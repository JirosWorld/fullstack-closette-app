import React from 'react';
import logo from "../../logo.svg";
import "./Header.css"

function Header({title}) {
    return (
        <>
            <header>
                <div className="title-container">
                    <img src={logo} className="App-logo" alt={title}
                         height="100"
                         width="100" />
                    <h1>{title}</h1>
                </div>
            </header>
        </>
    );
}

export default Header;
