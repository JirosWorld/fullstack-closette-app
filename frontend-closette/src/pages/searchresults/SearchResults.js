import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./SearchResults.css";
import MapIcon from "../../assets/icons/icon-map.png";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import Loader from "../../components/loader/Loader";
import TopNav from "../../components/topnav/TopNav";
import {NavLink} from "react-router-dom";
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";

function SearchResults() {

    const [toiletEntry, setToiletEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase
    useEffect(() => {
        document.title = "Zoekresultaten :: Closette"

        //de functie om data op te halen
        async function fetchToilets() {
            //zet de error steeds op leeg, iedere keer bij laden van data
            setError('');
            //zet de loader animatie aan zolang data wordt geladen
            toggleLoading(true);

            try {
                // await request
                const result = await axios.get('http://localhost:8080/toilets');
                // toon alle entries
                setToiletEntry(result);
                console.log("alle result inhoud:");
                console.log(result);
                console.log("alle result.data:");
                console.log(result.data);
                console.log("de 4e result.data:");
                console.log(result.data[3]);
                console.log("de eigenaar van de 4e entry:");
                console.log(result.data[3].owner.name);
            } catch (error) {
                console.log("komt u hier 4?");
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchToilets();

    }, []);

    return (
        <div className="search-results-feed">
            <TopNav/>
            <Header
                title="Zoekresultaten"
            />
            <BackButton/>
            {error && <p className="error-message">{error}</p>}
            <div className="posts">
                <h4>Toilet van de week: {toiletEntry.data && toiletEntry.data[6].id}</h4>
                <ul>
                    <li>title: {toiletEntry.data && toiletEntry.data[6].title}</li>
                    <li>author: {toiletEntry.data && toiletEntry.data[6].author}</li>
                    <li>geplaatst op: {toiletEntry.data && toiletEntry.data[6].postTime}</li>
                    <li>stad: {toiletEntry.data && toiletEntry.data[6].city}</li>
                    <li>land: {toiletEntry.data && toiletEntry.data[6].country}</li>
                    <li>genderneutraal?: {toiletEntry.data && toiletEntry.data[6].genderneutral
                        ? <span>Ja</span> : <span>Nee</span>}</li>
                    <li>gratis?: {toiletEntry.data && toiletEntry.data[6].free
                        ? <span>Ja</span> : <span>Nee</span>}</li>
                    <li>openingstijden: {toiletEntry.data && toiletEntry.data[6].openingHours}</li>
                    <li>informatie: {toiletEntry.data && toiletEntry.data[6].infoText}</li>
                    <li>breedtegraad: {toiletEntry.data && toiletEntry.data[6].latitude}</li>
                    <li>lengtegraad: {toiletEntry.data && toiletEntry.data[6].longitude}</li>
                    <li>Locatie op kaart: <a
                        href={toiletEntry.data && `https://www.openstreetmap.org/?mlat=${toiletEntry.data[6].latitude}&mlon=${toiletEntry.data[6].longitude}&zoom=15`}
                        rel="noreferrer" target="_blank"><img src={MapIcon} alt="map"
                                                              width="25"/></a> (externe link)
                    </li>
                    <li>heeft
                        foto?: {toiletEntry.data && toString(toiletEntry.data[6].hasPhoto)}</li>
                    <li>heeft rating: {toiletEntry.data && toiletEntry.data[6].ratingAverage}</li>
                    <li>koppeltabel: {toiletEntry.data && toiletEntry.data[6].ratingId}</li>
                    {/*<li>owner id: {toiletEntry.data && toiletEntry.data[0].owner.id}</li>*/}
                    {/*<li>geplaatst door user: {toiletEntry.data && toiletEntry.data[0].owner.name}</li>*/}
                </ul>

                <ul className="mapped__posts">
                    {loading && <Loader/>}
                    {toiletEntry.data && toiletEntry.data.map((post) => {
                            console.log("post.data:");
                            console.log(post);
                            return <li key={post.title && post.title}>
                                <NavLink
                                    activeClassName="active-link"
                                    to={"/" + post.id}>
                            <span className="thumbnail-container">
                                {/*check om te kijken of de thumbnail bestaat (URL mag niet kleiner dan (http://).length zijn, anders default image + link */}

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
                                </NavLink>

                                <div className="content-wrapper">
                                    <h2 className="mapped__post__title">
                                        <span>{Object.keys(post.title).length > 0 && post.title}</span>
                                    </h2>

                                    |<span className="mapped__post__author">Stad: {post.city}</span>|
                                    <br/>
                                    | <span className="mapped__post__subreddit">
                                Land
                                <NavLink
                                    activeClassName="active-link"
                                    to={"/" + post.id}> &#x23E9; "{post.country}"
                                </NavLink></span>|
                                    <br/>
                                    |<span className="mapped__post__votes">Rating: {post.ratingAverage}</span>.


                                    <div className="mapped__post__details">
                                        <p>
                                            genderneutraal?: {post.genderneutral
                                            ? <span>Ja</span> : <span>Nee</span>}<br/>
                                            gratis?: {post.free
                                            ? <span>Ja</span> : <span>Nee</span>}<br/>
                                            geplaatst op: {post.postTime}<br/>
                                            openingstijden: {post.openingHours}<br/>
                                            informatie: {post.infoText}<br/>
                                            breedtegraad: {post.latitude}<br/>
                                            lengtegraad: {post.longitude}<br/>
                                            Locatie op kaart: <a
                                                href={toiletEntry.data &&
                                                `https://www.openstreetmap.org/?mlat=${post.latitude}&mlon=${post.longitude}&zoom=15}`}
                                                rel="noreferrer" target="_blank"><img src={MapIcon}
                                                                                      alt="map"
                                                                                      width="25"/></a> (externe
                                            link)<br/>
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
    );
}

export default SearchResults;
