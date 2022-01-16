import React, {useEffect, useState} from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import {Link, useParams} from "react-router-dom";
import Loader from "../../components/loader/Loader";
import axios from "axios";

function NewsPost() {
    const {id} = useParams();
    const [newsEntry, setNewsEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Nieuws artikel :: Closette"

        async function fetchAllNews() {
            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/news/${id}`);
                setNewsEntry(result.data);
                console.log("alle nieuws result.data:");
                console.log(setNewsEntry);

            } catch (error) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchAllNews();

    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="Artikel"/>
            <div className="newspost__page content-wrapper">
                <section>
                    <article>
                        {error && <p className="error-message">{error}</p>}
                        {loading && <Loader/>}
                        <h1>{newsEntry && newsEntry.title}</h1>
                        <h3>{newsEntry && newsEntry.postTime}</h3>
                        {/*<p>{newsEntry && newsEntry.newsauthor.username}</p>*/}
                        <p>{newsEntry && newsEntry.description}</p>
                        <p>{newsEntry && newsEntry.paragraph}</p>
                    </article>
                    <div>
                        <Link to="/">Terug naar Home</Link>
                    </div>
                </section>
                <BackButton/>
            </div>
        </>
    );
}

export default NewsPost;