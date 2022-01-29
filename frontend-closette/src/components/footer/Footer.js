import React from 'react';
import "./Footer.css";
import ScrollTop from "../scrolltop/ScrollTop";

function Footer({children}) {
    return (
        <>
            <footer>
                <div className="footer__content">
                    <p><strong>Copyright &copy; 2022 ~ Jiro Ghianni</strong></p>
                </div>
                <ScrollTop />
            </footer>
        </>
    );
}

export default Footer;
