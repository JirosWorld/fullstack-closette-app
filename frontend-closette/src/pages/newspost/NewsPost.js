import React from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";

function NewsPost({children}) {
    return (
        <section className="news__post">
            <TopNav/>
            <Header
                title="Artikel"/>
            {children}
            <BackButton />
        </section>
    );
}

export default NewsPost;