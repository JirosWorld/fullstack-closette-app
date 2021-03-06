import React, {useEffect} from 'react';
import "./HomePage.css";
import Header from "../../components/header/Header";
import TopNav from "../../components/topnav/TopNav";
import LandingSection from "../../components/sections/LandingSection/LandingSection";
import FeaturedToilet from "../../components/sections/FeaturedToilet/FeaturedToilet";
import {Link} from "react-router-dom";
import FAQbook from "../../assets/icons/icon-book.png";

function HomePage() {

    useEffect(() => {
        document.title = "Closette :: Home :: de genderneutrale toiletten app"
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");
    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="Home"/>
            <div className="home__page  content-wrapper">
                <LandingSection/>
                <hr/>
                <p><Link to="/info/faq-handleiding"><img src={FAQbook}
                        alt="reader icon"
                        width="35" className="visual-icon hoverwide"/></Link>
                    Lees meer <Link to="/info/faq-handleiding">in de f.a.q.</Link></p>
                <hr/>
                <FeaturedToilet/>
            </div>
        </>

    );
}

export default HomePage;
