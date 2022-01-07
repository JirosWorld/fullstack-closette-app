import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
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
    // Webtoken: verander dit getal wanneer deze verlopen is
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MjI1MjEzMCwiaWF0IjoxNjQxMzg4MTMwfQ.yauYw0EQTXpV4Nq0U5qf5gwxpPbVrefKAsaTqHQ-Cuo";

    const decoded = jwt_decode(token);

    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MjI1MjEzMCwiaWF0IjoxNjQxMzg4MTMwfQ.yauYw0EQTXpV4Nq0U5qf5gwxpPbVrefKAsaTqHQ-Cuo');


    //mounting fase
    useEffect(() => {
        document.title = "Inzenden :: Closette"
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
                console.log(result.data[1].title);
            } catch (error) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        getResults();

    }, []);

    return (
        <section className="toilet__page">
            <TopNav>
                <li>
                    <NavLink to="/:id" activeClassName="active-link">one post</NavLink>
                </li>
            </TopNav>
            <Button/>
            <Header
                icon={logo}
                title="Toevoegen / Inzenden"
            />
            {error && <p className="error-message">{error}</p>}
            {loading && <Loader/>}
            {subInfo &&
            <div className="toilet__card">
                <header className="toilet__header">
                    <span className="thumbnail-container">
                        {/* met objectkeys eerst checken of data is binnengekomen, daarna renderen */}
                        {/* anders wordt standaard plaatje geplaatst */}
                        {Object.keys(subInfo).length > 0 && subInfo.header_img !== null ?
                            <img src={`${subInfo.header_img}`} alt="thumbnail" className="thumbnail"/> :
                            <img src={logo} alt="thumbnail" className="thumbnail" height="150" width="150"/>}
                    </span>
                    <h2 className="toilet__heading">{subInfo.data.title} = Name</h2>
                </header>
                <section>
                    <h4 className="toilet__heading">Title display:</h4>
                    <h2 className="toilet__title">
                        Title
                    </h2>
                    <h2 className="toilet__heading">Description</h2>
                    <p className="toilet__description">{subInfo.author}Lorem ipsum</p>
                    <h3 className="toilet__heading">Subscribers:</h3>

                     {/* data omzetten naar puntjes met mijn helper functie  */}
                    <p className="toilet__subscribers">{parseToDots(subInfo.isbn)}1.000</p>
                </section>
                <section>
                    <h1>Toevoegen - nieuw toilet posten</h1>
                        <p>Handy tip: when giving a co-ordinate, latitude (north or south) always precedes longitude (east or west). Latitude comes first in alphabetical order and it also is the first coordinate in a set.</p>
                </section>

            </div>
            }
            <Button/>
        </section>
    );
}

export default SubmitPage;
