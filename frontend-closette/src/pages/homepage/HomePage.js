import React, {useEffect} from 'react';
import "./HomePage.css"
import Header from "../../components/header/Header";
import TopNav from "../../components/topnav/TopNav";
import LandingSection from "../../components/sections/LandingSection/LandingSection";
import FeaturedToilet from "../../components/sections/FeaturedToilet/FeaturedToilet";
import {Link} from "react-router-dom";

function HomePage() {

    useEffect(() => {
        document.title = "Closette ::: Home"
    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="Home"/>
            <div className="home__page  content-wrapper">
                <LandingSection/>
                <hr/>
                <p>Lees meer <Link to="/info/faq-handleiding">in de f.a.q.</Link></p>
                <hr/>
                <FeaturedToilet/>
            </div>
        </>

    );
}

export default HomePage;
