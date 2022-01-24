import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./SearchResults.css";
import MapIcon from "../../assets/icons/icon-map.png";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import Loader from "../../components/loader/Loader";
import TopNav from "../../components/topnav/TopNav";
import {Link} from "react-router-dom";
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";
import GenderneutralIcon from "../../assets/icons/icon-transgenderneutral.svg";
import FreeIcon from "../../assets/icons/icon-money-free-gratis.png";
import PaidIcon from "../../assets/icons/icon-money-pay-euro.png";
import AccessibleIcon from "../../assets/icons/icon-accessible.svg"

function SearchResults() {

    const [toiletEntry, setToiletEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase
    useEffect(() => {
        document.title = "Alle data :: Closette"

        setTimeout(() => {
            window.scrollTo({top: 0, behavior: 'smooth'})
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");

        async function fetchToilets() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get('http://localhost:8080/toilets');
                setToiletEntry(result);
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

        fetchToilets();

    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="Alle data"
            />
            <div className="searchresults__page content-wide">

                {error && <p className="error-message">{error}</p>}
                <div className="posts">

                    <ul className="mapped__posts">
                        {loading && <Loader/>}
                        {toiletEntry.data && toiletEntry.data.map((post) => {
                                console.log("post.data:");
                                console.log(post);
                                return <li key={post.id && post.title}>
                                    <Link
                                        to={`toilets/${post.id}`}>
                            <span className="thumbnail-container">
                                {/*check om te kijken of de thumbnail bestaat
                                anders default image + link */}
                                {post.photo ?
                                    <img src={`http://localhost:8080/download/${post.photo.fileName}`} alt="thumbnail"
                                         className="thumbnail"
                                         width="150" height="150"/> :
                                    <span className="no-image">
                                        <img src={noImage} alt="thumbnail"
                                             className="thumbnail transparent" height="150"
                                             width="150"/><p>NO IMAGE</p></span>
                                }
                                    </span>
                                    </Link>

                                    <section className="content-wide">
                                        <h2 className="mapped__post__title">nr. {post.id}. &nbsp;
                                            <Link
                                                to={`toilets/${post.id}`}>{Object.keys(post.title).length
                                            > 0
                                            && post.title}</Link>
                                        </h2>
                                        <span className="mapped__post__author">Stad: {post.city}</span>
                                        <br/>
                                        <span className="mapped__post__detail">
                                Land {post.country}</span>
                                        <br/>
                                        <span
                                            className="mapped__post__votes">Rating:
                                            {post.ratingAverage} &#9733; &#x2605; &#9733;</span>
                                        <div className="mapped__post__details">
                                            <p>
                                                gender/gratis/invaliden ja/nee <br/>
                                                {post.genderneutral
                                                    ? <span><img src={GenderneutralIcon}
                                                                 alt="map"
                                                                 title="genderneutraal"
                                                                 width="25"
                                                                 className="genderneutral-icon"/></span> :
                                                    <span>Nee</span>}
                                                 {post.free
                                                ? <span><img src={FreeIcon}
                                                             alt="map"
                                                             title="gratis"
                                                             width="25"
                                                             className="free-icon"/></span>
                                                : <span><img src={PaidIcon}
                                                             alt="map"
                                                             title="niet gratis"
                                                             width="25"
                                                             className="free-icon"/></span>}
                                                 {post.accessible ?
                                                <span><img src={AccessibleIcon}
                                                           alt="map"
                                                           title="rolstoeltoegankelijk"
                                                           width="25"
                                                           className="accessible-icon"/>
                                                </span> : <span>Nee</span>}<br/>
                                                openingstijden: {post.openingHours}<br/>
                                                hygi&euml;ne: {post.cleanliness}<br/>
                                                {post.latitude
                                                ?
                                                    <>
                                                        Locatie op kaart: <a
                                                        href={toiletEntry.data &&
                                                        `https://www.openstreetmap.org/?mlat=${post.latitude}&mlon=${post.longitude}&zoom=15}`}
                                                        rel="noreferrer" target="_blank">
                                                        <img src={MapIcon}
                                                             alt="map"
                                                             width="25"
                                                             className="map-icon"/> (externe
                                                        link)</a>
                                                    </>
                                                    : <>(geen GPS locatie)</> }
                                                <br/>
                                                heeft foto?: {post.hasPhoto
                                                ? <span>Ja</span> : <span>Nee</span>}<br/>
                                                heeft rating: {post.ratingAverage}<br/>
                                                Foto: <a href={post.photo && `http://localhost:8080/download/${post.photo.fileName}`} rel="noreferrer" target="_blank">{post.photo && `/download/${post.photo.fileName}`}</a>
                                                {/*owner id: {post.owner.id}<br/>*/} <br/>
                                                geplaatst door user: {post.owner && post.owner.name}
                                            </p>
                                        </div>
                                    </section>
                                    {/* <!-- end content wrapper --> */}
                                </li>

                            }
                        )}
                    </ul>

                </div>
                <BackButton/>
            </div>
        </>
    );
}

export default SearchResults;
