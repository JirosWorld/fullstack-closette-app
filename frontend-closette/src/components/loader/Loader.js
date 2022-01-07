import React from 'react';
import {ReactComponent as LoadingIcon} from "../../assets/icons/loading.svg";
import "./Loader.css";

function Loader() {
    return (
        <p className="loading-animation">
           <LoadingIcon className="loader" alt="loading"/> Data laadt..
        </p>
    );
}

export default Loader;
