import React, {useEffect, useState} from 'react';
import MapIcon from "../../../assets/icons/icon-map.png";
import axios from "axios";
import {Link} from "react-router-dom";
import "./FeaturedToilet.css"
import FeaturedToiletImg from "../../../assets/img/img-post-victorian-toilet.jpg";
import Loader from "../../loader/Loader";

function FeaturedToilet() {

    const [toiletEntry, setToiletEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        async function fetchToilet() {
            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get('http://localhost:8080/toilets');
                setToiletEntry(result);

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de data - (${error.message})`);
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchToilet();

    }, []);

    return (

        <>
            {error && <p className="error-message">{error}</p>}
            <div className="featured-post">
                <h4>Toilet van de week: {toiletEntry.data && toiletEntry.data[6].id}</h4>
                <div className="featured-post--content">
                    <>
                        {toiletEntry.data &&
                        <Link
                            to={`/${toiletEntry.data[6].title}`}>
                            <span className="thumbnail-container">
                                    <img src={FeaturedToiletImg} alt="thumbnail"
                                         className="thumbnail"
                                         width="150"/>
                            </span>
                        </Link>}
                    </>
                    {toiletEntry.data &&
                    <>
                        <ul>
                            {loading && <Loader/>}
                            <li>naam: <Link
                                to={`toilets/${toiletEntry.data[6].id}`}>{toiletEntry.data
                            && toiletEntry.data[6].title}</Link></li>
                            <li>stad: {toiletEntry.data && toiletEntry.data[6].city}</li>
                            <li>land: {toiletEntry.data && toiletEntry.data[6].country}</li>
                            <li>genderneutraal?: {toiletEntry.data && toiletEntry.data[6].genderneutral
                                ? <span>Ja</span> : <span>Nee</span>}</li>
                            <li>informatie: {toiletEntry.data && toiletEntry.data[6].infoText}</li>
                            <li>Locatie op kaart: <a
                                href={toiletEntry.data && `https://www.openstreetmap.org/?mlat=${toiletEntry.data[6].latitude}&mlon=${toiletEntry.data[6].longitude}&zoom=15`}
                                rel="noreferrer" target="_blank"><img src={MapIcon} alt="map"
                                                                      width="25"
                                                                      className="map-icon"/></a> (externe
                                link)
                            </li>
                            <li>beoordeling: {toiletEntry.data && toiletEntry.data[6].ratingAverage}</li>
                        </ul>
                    </>
                    }
                </div>
            </div>
        </>
    );
}

export default FeaturedToilet;