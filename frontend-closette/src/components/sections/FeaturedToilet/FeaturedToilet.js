import React, {useEffect, useState} from 'react';
import MapIcon from "../../../assets/icons/icon-map.png";
import axios from "axios";
import {Link} from "react-router-dom";
import "./FeaturedToilet.css";
import FeaturedToiletImg from "../../../assets/img/img-post-victorian-toilet.jpg";
import Loader from "../../loader/Loader";
import GenderneutralIcon from "../../../assets/icons/icon-transgenderneutral.svg";

function FeaturedToilet() {

    const [toiletEntry, setToiletEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    // beoordeling berekenen
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {

        async function fetchToilet() {
            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get('http://localhost:8080/toilets');
                setToiletEntry(result);

                let sum = 0;
                const itemsFound = result.data[6].ratings.length;
                for(let i = 0; i < itemsFound; i++){
                    sum += parseInt(result.data[6].ratings[i].ratingToilet);
                }

                const averagePopularity = (Math.round((sum / itemsFound))/100)*100;
                console.log("nr popularitySum:", sum);
                setNumberOfRatings(itemsFound);
                console.log("nr itemsFound/setNumberOfRatings:", itemsFound);
                setAverageRating(averagePopularity);
                console.log("Average popularity/setAverageRating:", averagePopularity);

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
                <h3>Toilet van de week</h3>
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
                            <h4><Link
                                to={`toilets/${toiletEntry.data[6].id}`}>{toiletEntry.data
                            && toiletEntry.data[6].title}</Link></h4>
                            <li className="mapped__post__nation">stad: {toiletEntry.data
                            && toiletEntry.data[6].city}</li>
                            <li className="mapped__post__nation">land: {toiletEntry.data
                            && toiletEntry.data[6].country}</li>
                            <li>Gemiddelde beoordeling: {averageRating}.0 &#9733; &#x2605; &#9733;
                                </li>
                            <li>genderneutraal?: {toiletEntry.data
                            && toiletEntry.data[6].genderneutral
                                ? <span>Ja <img src={GenderneutralIcon}
                                                alt="map"
                                                title="genderneutraal"
                                                width="25"
                                                className="genderneutral-icon"/></span> :
                                <span>Nee</span>}</li>
                            <li>informatie: {toiletEntry.data
                            && toiletEntry.data[6].infoText}</li>
                            <li>Locatie op kaart: <a
                                href={toiletEntry.data
                                && `https://www.openstreetmap.org/?mlat=${toiletEntry.data[6].latitude}&mlon=${toiletEntry.data[6].longitude}&zoom=15`}
                                rel="noreferrer" target="_blank">
                                <img src={MapIcon} alt="map"
                                     width="25"
                                     className="map-icon"/></a> (externe
                                link)
                            </li>
                        </ul>
                    </>
                    }
                </div>
            </div>
        </>
    );
}

export default FeaturedToilet;