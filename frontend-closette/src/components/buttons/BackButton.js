import React from 'react';
import {
    useHistory
} from "react-router-dom";
import {ReactComponent as BackArrow} from "../../assets/icons/back.svg";
import "./BackButton.css"

function BackButton() {

    const history = useHistory();

    return (
        <button onClick={history.goBack} className="backnav"><BackArrow className="backnav" alt="backarrow"/></button>
    );
}

export default BackButton;
