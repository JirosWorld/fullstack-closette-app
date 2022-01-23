import React, {useEffect, useState} from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import {Link, useParams} from "react-router-dom";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";
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
                                    {/* bestaat-foto-check */}
                                    {/*{newsEntry && newsEntry.id}*/}

                                        <span className="true-image">
                                        <img
                                            src={`http://localhost:8080/download/img-post-amsterdammuseum.jpg`} alt="thumbnail"
                                             className="true-image__visible" height="300"
                                             width="300"/></span>

                            </span>
                            </div>
                            <div className="template-intro news">
                                <h1>{newsEntry && newsEntry.title}</h1>
                                <h3>{newsEntry && newsEntry.postTime}</h3>
                                {/*<p>{newsEntry && newsEntry.newsauthor.username}</p>*/}
                                <p>{newsEntry && newsEntry.description}</p>
                            </div>
                        </div>
                        <div className="template-main-content">
                            <p>{newsEntry && newsEntry.paragraph}</p>
                        </div>
                    </article>
                    <div>
                        <p><Link to="/">&lt;&lt; Home</Link></p>
                    </div>
                </section>
            </main>
            <BackButton/>
        </>
    );
}

export default NewsPost;