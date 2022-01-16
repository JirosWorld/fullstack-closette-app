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

function SearchResults() {

    const [toiletEntry, setToiletEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase
    useEffect(() => {
        document.title = "Zoekresultaten :: Closette"

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
                setError("Er is iets misgegaan bij het ophalen van de data");
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
                title="Zoekresultaten"
            />
            <div className="searchresults__page content-wrapper">
                <BackButton/>
                {error && <p className="error-message">{error}</p>}
                <div className="posts">

                    <ul className="mapped__posts">
                        {loading && <Loader/>}
                        {toiletEntry.data && toiletEntry.data.map((post) => {
                                console.log("post.data:");
                                console.log(post);
                                return <li key={post.title && post.title}>
                                    <Link
                                        to={`toilets/${post.id}`}>
                            <span className="thumbnail-container">
                                {/*check om te kijken of de thumbnail bestaat
                                (URL mag niet kleiner dan (http://).length zijn,
                                anders default image + link */}

                                {post.hasPhoto.length > 7 ?
                                    <img src={`${post.hasPhoto}`} alt="thumbnail"
                                         className="thumbnail"
                                         width="150"/> :
                                    <span className="no-image">
                                        <img src={noImage} alt="thumbnail"
                                             className="thumbnail transparent" height="150"
                                             width="150"/><p>NO IMAGE</p></span>
                                }
                            </span>
                                    </Link>

                                    <div className="content-wrapper">
                                        <h2 className="mapped__post__title">
                                            <Link
                                                to={`toilets/${post.id}`}>{Object.keys(post.title).length > 0
                                            && post.title}</Link>
                                        </h2>

                                        |<span className="mapped__post__author">Stad: {post.city}</span>|
                                        <br/>
                                        | <span className="mapped__post__detail">
                                Land
                                <Link
                                    to={`toilets/${post.id}`}> &#x23E9; "{post.postTime}"
                                </Link></span>|
                                        <br/>
                                        |<span
                                        className="mapped__post__votes">Rating: {post.ratingAverage}</span>.


                                        <div className="mapped__post__details">
                                            <p>
                                                genderneutraal?: {post.genderneutral
                                                ? <span>Ja</span> : <span>Nee</span>}<br/>
                                                gratis?: {post.free
                                                ? <span>Ja</span> : <span>Nee</span>}<br/>
                                                geplaatst op: {post.postTime}<br/>
                                                openingstijden: {post.openingHours}<br/>
                                                informatie: {post.infoText}<br/>
                                                rolstoeltoegankelijk: {post.accessible ?
                                                <span>Ja</span> : <span>Nee</span>}<br/>
                                                hygi&euml;ne: {post.cleanliness}<br/>
                                                breedtegraad: {post.latitude}<br/>
                                                lengtegraad: {post.longitude}<br/>
                                                Locatie op kaart: <a
                                                href={toiletEntry.data &&
                                                `https://www.openstreetmap.org/?mlat=${post.latitude}&mlon=${post.longitude}&zoom=15}`}
                                                rel="noreferrer" target="_blank">
                                                <img src={MapIcon}
                                                     alt="map"
                                                     width="25"
                                                     className="map-icon"/> (externe
                                                link)</a><br/>
                                                heeft foto?: {post.hasPhoto
                                                ? <span>Ja</span> : <span>Nee</span>}<br/>
                                                heeft rating: {post.ratingAverage}<br/>
                                                {/*owner id: {post.owner.id}<br/>*/}
                                                {/*geplaatst door user: {post.owner.name}*/}
                                            </p>
                                        </div>
                                    </div>
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
