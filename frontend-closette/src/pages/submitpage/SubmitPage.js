import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import Loader from "../../components/loader/Loader";
import "./SubmitPage.css";
import logo from "../../logo.svg";
import GPS from "../../assets/img/MapsViewGPSCoordinates-iPhone.jpg";
import TopNav from "../../components/topnav/TopNav";
import parseToDots from "../../helpers/parseToDots";
import Accordeon from "../../components/accordeon/Accordeon";
import {Link} from "react-router-dom";

function SubmitPage() {
    const [subInfo, setSubInfo] = useState();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    // const {toilet: toiletName} = useParams();

    const {user} = useContext(AuthContext);
    console.log(user);

    //mounting fase
    useEffect(() => {
        document.title = "Toilet toevoegen :: Closette";

        async function getResults(data) {
            //zet de error steeds op leeg, iedere keer bij laden van data
            setError('');
            //zet de loader animatie aan zolang data wordt geladen
            toggleLoading(true);

            try {
                const result = await axios.post('http://localhost:8080/toilets',{
                    accessible: data.accessible,
                    city: data.city,
                    cleanliness: data.cleanliness,
                    country: data.country,
                    free: data.free,
                    genderneutral: data.genderneutral,
                    hasPhoto: data.hasPhoto,
                    infoText: data.infoText,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    openingHours: data.openingHours,
                    ratingAverage: data.ratingAverage,
                    title: data.title,
                });
                setSubInfo(result);
                console.log("Alle data van 1 submitrequest:");
                console.log(result);
                console.log("data loggen:");
                console.log(result.data[4].title);
            } catch (error) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        getResults();

    }, []);

    return (
        <section className="submit__page">
            <TopNav/>
            <Header
                title="Toevoegen / Inzenden"
            />
            {error && <p className="error-message">{error}</p>}

            {user ?
                <><h3>Toilet gevonden? Voeg hier een nieuwe toe!</h3>
                    <section>
                        <h1>Toevoegen - nieuw toilet posten</h1>
                        <div className="wrapper">
                            <Accordeon title="Wat betekenen die locatie getallen?">
                                <p>Alle plekken op de wereld zijn te beschrijven met GPS co&ouml;rdinaten: de breedtegraad en lengtegraad. Ezelsbruggetje: breedtegraad (latitude) komt altijd v&oacute;&oacute;r
                                    lengtegraad (longitude) - dus op alfabetische volgorde. Ook in het
                                    Engels zijn ze toevallig in alfabetische volgorde: [latitude, longitude].</p>
                            </Accordeon>
                        </div>
                    </section>
                </>
                :
                <h3>Je bent niet ingelogd - <Link to="/signup">Maak eerst een account</Link> om te kunnen reageren
                    of <Link to="/login"> log in</Link>.</h3>}
            {loading && <Loader/>}
            {subInfo &&
            <div className="toilet__card">
                <header className="toilet__header">
                    <span className="thumbnail-container">
                        {/* met objectkeys eerst checken of data is binnengekomen, daarna renderen */}
                        {/* anders wordt standaard plaatje geplaatst */}
                        {Object.keys(subInfo.data[4]).length > 0 && subInfo.hasPhoto !== null ?
                            <img src={`${subInfo.data[4].header_img}`} alt="thumbnail"
                                 className="thumbnail"/> :
                            <img src={logo} alt="thumbnail" className="thumbnail" height="150"
                                 width="150"/>}
                    </span>
                    <h2 className="toilet__heading">{subInfo.data[4].title} = Name</h2>
                </header>
                <section>
                    <h4 className="toilet__heading">Title display:</h4>
                    <h2 className="toilet__title">
                        {subInfo.data[4].author}
                    </h2>
                    <h2 className="toilet__heading">Description</h2>
                    <p className="toilet__description">{subInfo.data[4].infoText}.</p>
                    <h3 className="toilet__heading">Subscribers:</h3>

                    {/* data omzetten naar puntjes met mijn helper functie  */}
                    <p className="toilet__subscribers">{parseToDots(subInfo.data[4].latitude)}1.000</p>
                </section>
            </div>
            }
            <BackButton/>
        </section>
    );
}

export default SubmitPage;
