import React from 'react';
import "./ScrollTop.css";

function ScrollTop() {

    function scrollToTop() {
        setTimeout(() => {
            window.scrollTo({top: 0, behavior: 'smooth'})
        }, 0);
    }

    return (
        <div className="scroll" onClick={scrollToTop}> &uarr; </div>
    );
}

export default ScrollTop;