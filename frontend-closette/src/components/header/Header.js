import React from 'react';
import "./Header.css";

function Header({title}) {
    return (
        <>
            <header>
                <div className="header__container">
                    <h1>{title}</h1>
                </div>
            </header>
        </>
    );
}

export default Header;
