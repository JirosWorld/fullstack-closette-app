import React, {useEffect} from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import FeedSection from "../../components/sections/FeedSection/FeedSection";

function NewsFeedPage(props) {

    useEffect(() => {
        document.title = "Nieuwsoverzicht :: Closette"
    }, []);

    return (
        <section className="news__page">
            <TopNav/>
            <Header
                title="Nieuws"/>
            <FeedSection />
        </section>
    );
}

export default NewsFeedPage;