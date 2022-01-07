import React from 'react';
import {
    useHistory
} from "react-router-dom";
import {ReactComponent as BackArrow} from "../../assets/icons/back.svg";
import "./Button.css"

function Button() {

    const history = useHistory();

    return (
        <button onClick={history.goBack} className="backnav"><BackArrow className="backnav" alt="backarrow"/>Back to previous page</button>
    );
}

export default Button;
