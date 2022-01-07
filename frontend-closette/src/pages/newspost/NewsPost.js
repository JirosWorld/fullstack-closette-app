import React from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";

function NewsPost(props) {
    return (
        <section className="news__post">
            <TopNav/>
            <Header
                title="Artikel"/>
        </section>
    );
}

export default NewsPost;