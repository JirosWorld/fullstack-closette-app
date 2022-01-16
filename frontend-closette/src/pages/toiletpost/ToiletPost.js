import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import axios from "axios";
import MapIcon from "../../assets/icons/icon-map.png";
import Loader from "../../components/loader/Loader";

function ToiletPost() {
    const {id} = useParams();
    const [toiletEntry, setToiletEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase
    useEffect(() => {
        document.title = "Toilet details :: Closette"

        async function fetchToilets() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/toilets/${id}`);
                setToiletEntry(result.data);
                console.log("alle toilet result.data:");
                console.log(setToiletEntry);

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
                title="Toilet details"/>
            <div className="toiletpost__page content-wrapper">
                <section>
                    <article>
                        {error && <p className="error-message">{error}</p>}
                        {loading && <Loader/>}
                        <h1>{toiletEntry && toiletEntry.title}</h1>
                        <h3>{toiletEntry && toiletEntry.postTime}</h3>
                        <p>{toiletEntry && toiletEntry.content}</p>
                        <p>
                            openingstijden: {toiletEntry && toiletEntry.openingHours}<br/>
                            informatie: {toiletEntry && toiletEntry.infoText}<br/>
                            rolstoeltoegankelijk: {toiletEntry && toiletEntry.accessible ?
                            <span>Ja</span> : <span>Nee</span>}<br/>
                            hygi&euml;ne: {toiletEntry && toiletEntry.cleanliness}<br/>
                            breedtegraad: {toiletEntry && toiletEntry.latitude}<br/>
                            lengtegraad: {toiletEntry && toiletEntry.longitude}<br/>
                            Locatie op kaart: <a
                            href={toiletEntry && toiletEntry.data &&
                            `https://www.openstreetmap.org/?mlat=${toiletEntry && toiletEntry.latitude}&mlon=${toiletEntry && toiletEntry.longitude}&zoom=15}`}
                            rel="noreferrer" target="_blank">
                            <img src={MapIcon}
                                 alt="map"
                                 width="25" className="map-icon"/> (externe
                            link)</a><br/>
                            heeft foto?: {toiletEntry && toiletEntry.hasPhoto
                            ? <span>Ja</span> : <span>Nee</span>}<br/>
                            heeft rating: {toiletEntry && toiletEntry.ratingAverage}<br/>
                        </p>
                    </article>
                    <article>
                        <Link to="/">Terug naar Home</Link>
                    </article>
                </section>
                <BackButton/>
            </div>
        </>
    );
}

export default ToiletPost;