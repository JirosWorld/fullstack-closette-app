import React from 'react';
import './Hamburger.css';
import {ReactComponent as SearchLookIcon} from "../../assets/icons/icon-lines-search-jiro.svg";
import {ReactComponent as PostPlusIcon} from "../../assets/icons/icon-lines-plus-jiro.svg";
import {Link} from "react-router-dom";

function Hamburger() {
    return (
        <>
            <Link to="/search"><SearchLookIcon className="svg-lookingglass-icon mobile" alt="search icon"/></Link>
            <Link to="/submit"><PostPlusIcon className="svg-plus-icon mobile" alt="post icon"/></Link>
            <div className="hamburger">
                <div className="burger burger1" />
                <div className="burger burger2" />
                <div className="burger burger3" />
            </div>
        </>
    );
}

export default Hamburger;