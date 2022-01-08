import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import Loader from "../../components/loader/Loader";
import "./SubmitPage.css";
import logo from "../../logo.svg";
import TopNav from "../../components/topnav/TopNav";
import parseToDots from "../../helpers/parseToDots";

function SubmitPage() {
    const [subInfo, setSubInfo] = useState();
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const {toilet: toiletName} = useParams();

    const {user} = useContext(AuthContext);
    console.log(user);

    //mounting fase
    useEffect(() => {
        document.title = "Toilet toevoegen :: Closette";

        async function getResults() {
            //zet de error steeds op leeg, iedere keer bij laden van data
            setError('');
            //zet de loader animatie aan zolang data wordt geladen
            toggleLoading(true);

            try {
                const result = await axios.get('http://localhost:8080/toilets', {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MjI1MjEzMCwiaWF0IjoxNjQxMzg4MTMwfQ.yauYw0EQTXpV4Nq0U5qf5gwxpPbVrefKAsaTqHQ-Cuo",
                });
                setSubInfo(result);
                console.log("Alle data van 1 submitpage:");
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
                icon={logo}
                title="Toevoegen / Inzenden"
            />
            {error && <p className="error-message">{error}</p>}

            {user ? <h3>Toilet gevonden? Voeg hier een nieuwe toe!</h3> : <h3>Je bent niet ingelogd</h3>}
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
                <section>
                    <h1>Toevoegen - nieuw toilet posten</h1>
                    <p>Handy tip: when giving a co-ordinate, latitude (north or south) always
                        precedes longitude (east or west). Latitude comes first in alphabetical
                        order and it also is the first coordinate in a set.</p>
                </section>

            </div>
            }
            <BackButton/>
        </section>
    );
}

export default SubmitPage;
