import React, {useEffect, useState} from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import {Link} from "react-router-dom";
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";
import "./NewsFeedPage.css";

function NewsFeedPage() {
    const [newsEntry, setNewsEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase
    useEffect(() => {
        document.title = "Nieuwsoverzicht :: Closette"

        async function fetchAllNews() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get('http://localhost:8080/news');
                setNewsEntry(result);
                console.log("alle result inhoud:");
                console.log(result);
                console.log("alle result.data:");
                console.log(result.data);

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de data - (${error.message})`);
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
                title="Nieuwsoverzicht"
            />
            <main className="newsfeed__page content-wide">

                {error && <p className="error-message">{error}</p>}
                <section className="news posts">

                    <ul className="mapped__posts">
                        {loading && <Loader/>}
                        {newsEntry.data && newsEntry.data.map((post) => {
                                console.log("post.data:");
                                console.log(post);
                                return <li key={post.id && post.title}>
                                    <Link
                                        to={`news/${post.id}`}>
                            <span className="thumbnail-container">
                            {/*    placeholder*/}
                                <span className="no-image">
                                        <img src={noImage} alt="thumbnail"
                                             className="thumbnail transparent" height="150"
                                             width="150"/><p>NO IMAGE</p></span>
                            </span>
                                    </Link>

                                    <div className="wrapper">
                                        <h2 className="mapped__post__title">
                                        <span><Link
                                            to={`news/${post.id}`}> "{post.title}"
                                </Link></span>
                                        </h2>
                                        <span className="mapped__post__author">
                                    Auteur: {post.newsauthor && post.newsauthor.username}
                                    </span><span className="mapped__post__detail">
                                Datum <Link
                                        to={`/news/${post.id}`}> {post.postTime}
                                </Link></span>

                                        <div className="mapped__post__details">
                                            <p>
                                                Samenvatting: {post.description}
                                            </p>
                                            <p><Link
                                                to={`news/${post.id}`}> Lees meer &rang;&rang;
                                            </Link></p>
                                        </div>
                                    </div>
                                    {/* <!-- end content wrapper --> */}
                                </li>

                            }
                        )}
                    </ul>
                    <ul className="pagination">
                        <li>&lt;&lt;</li>
                        <li className="active">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>&gt;&gt;</li>
                    </ul>
                </section>
                <BackButton/>
            </main>
        </>
    );
}

export default NewsFeedPage;