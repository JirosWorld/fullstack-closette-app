import React, {useEffect, useState} from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import {Link, useParams} from "react-router-dom";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import "./TemplatePost.css";

function NewsPost() {
    const {id} = useParams();
    const [newsEntry, setNewsEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Nieuws artikel :: Closette"

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");

        async function fetchAllNews() {
            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/news/${id}`);
                setNewsEntry(result.data);
                console.log("alle nieuws result.data:");
                console.log(newsEntry);

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de data - (${error.message})`);
                console.error(error);
            }
            toggleLoading(false);
        }
        fetchAllNews()
        // fetchAllNews().then(data => setNewsEntry(data));

    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="Artikel"/>
            <main className="newspost__page content-wrapper">
                <section className="template">
                    <article>
                        {error && <p className="error-message">{error}</p>}
                        {loading && <Loader/>}
                        <div className="template-head">
                            <div className="template-thumbnail">
                                <span className="thumbnail-container">

                                        <span className="true-image">
                                        <img
                                            src={`http://localhost:8080/download/img-news-unisex-sign.png`} alt="thumbnail"
                                             className="true-image__visible"
                                             width="300"/></span>

                            </span>
                            </div>
                            <div className="template-intro news">
                                <h1>{newsEntry && newsEntry.title}</h1>
                                <h3>{newsEntry && newsEntry.postTime}</h3>
                                <p><em>Door: {newsEntry.newsauthor && newsEntry.newsauthor.username}</em></p>
                                <p>{newsEntry && newsEntry.description}</p>
                            </div>
                        </div>
                        <div className="template-main-content">
                            <p>{newsEntry && newsEntry.paragraph}</p>
                        </div>
                    </article>
                    <div>
                        <p><Link to="/news">&lt;&lt; Nieuwsoverzicht</Link></p>
                    </div>
                </section>
            </main>
            <BackButton/>
        </>
    );
}

export default NewsPost;