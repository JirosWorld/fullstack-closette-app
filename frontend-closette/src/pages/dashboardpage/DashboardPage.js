import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Accordeon from "../../components/accordeon/Accordeon";
import GPS from "../../assets/img/MapsViewGPSCoordinates-iPhone.jpg";
import Loader from "../../components/loader/Loader";

function DashboardPage(props) {

    useEffect(() => {
        document.title = "Mijn dashboard :: Closette"
    }, []);

    const [privateContent, setPrivateContent] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const {user} = useContext(AuthContext);
    console.log(user);

    useEffect(() => {
        const token = localStorage.getItem('closetteToken');

        async function getPrivateContent() {
            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get('http://localhost:8080/users', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log("Alle users te zien voor admin:");
                console.log(result.data);
                setPrivateContent(result);
            } catch (e) {
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(e);
            }
            toggleLoading(false);
        }

        getPrivateContent();
    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="Mijn Dashboard + F.A.Q."/>
            <section className="dashboard__user-data">
                {user ? <h2>Gegevens</h2> :
                    <>
                        <h2>Je bent niet ingelogd</h2>
                        <p>Heb je een account? Ga dan hier <Link
                            to="/login"> naar de inlog pagina</Link>.</p>
                    </>}
                {user ?
                    <>
                        <h2>Moderator Dashboard</h2>
                        <h3>Alle geregistreerde gebruikers</h3>
                        <div>
                            {loading && <Loader/>}
                            <ul className="mapped__posts">
                                {privateContent.data  && privateContent.data.map((post) => {
                                        console.log("Post data:");
                                        console.log(post);
                                        return <li
                                            key={Object.keys(post.username).length > 0 && post.username}>
                                            <ul>
                                                <li>Gebruikersnaam: {Object.keys(post.username).length > 0 && post.username}</li>
                                                <li>E-mail: {Object.keys(post.email).length > 0 && post.email}</li>
                                                <li>Wachtwoord (gecodeerd): {Object.keys(post.password).length > 0 && post.password}</li>
                                            </ul>
                                        </li>
                                    }
                                )}
                            </ul>
                        </div>
                    </>
                    :
                    <span>:-)</span>
                }
                {user &&
                <>
                    <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </>
                }
            </section>
            {user &&
            <section className="dashboard__content">
                <h3>Veel gestelde vragen</h3>
                <h4>Closette: Hoe werkt het?</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis
                    dolor dolore fuga id molestias qui quo unde?</p>
                <ul>
                    <li>Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar toiletten.
                    </li>
                    <li>De zoekresultaten kunnen getrechterd worden via de verschillende
                        filtereigenschappen van toiletten (stad, land, gratis/niet-gratis, wel/niet
                        genderneutraal, toegankelijk voor minder validen, half-openbaar, vies of
                        schoon, heeft wel/geen foto, openingstijden, waardering).
                    </li>
                    <li>Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
                    </li>
                    <li>Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het adres,
                        een beschrijving en kunnen eventueel een foto uploaden.
                    </li>

                    <li>Moderators hebben de mogelijkheid om posts te censureren of verwijderen</li>
                </ul>
                <div className="wrapper">
                    <Accordeon title="Wat betekenen die locatie getallen?">
                        <p>Alle plekken op de wereld zijn te beschrijven met GPS co&ouml;rdinaten:
                            de breedtegraad en lengtegraad. Ezelsbruggetje: breedtegraad (latitude)
                            komt altijd v&oacute;&oacute;r
                            lengtegraad (longitude) - dus op alfabetische volgorde. Ook in het
                            Engels zijn ze toevallig in alfabetische volgorde: [latitude,
                            longitude].</p>
                    </Accordeon>
                    <Accordeon title="Hoe vind ik mijn GPS locatie? (ENG)">
                        <p>Open Maps on your iPhone or iPad and then follow these steps to get your
                            current location’s GPS coordinates.</p>
                        <ol>
                            <li>Tap the <strong>current location</strong> button on the top right.
                            </li>
                            <li>When the blue circle for your spot appears on the
                                map, <strong>tap</strong> it.
                            </li>
                            <li><strong>Swipe up</strong> from the bottom to view full details for
                                your
                                location and you’ll see the Latitude and Longitude.
                            </li>
                        </ol>
                    </Accordeon>
                    <Accordeon title="GPS locatie op je iPhone vinden">
                        <figure aria-describedby="caption-attachmen"
                                className="gps">
                            <img src={GPS} width="400" alt="gps explanation"
                                 className="Maps My GPS Coordinates-iPhone"/>
                            <figcaption id="caption" className="gps">Your
                                location&#8217;s GPS coordinates on iOS
                            </figcaption>
                        </figure>
                    </Accordeon>
                </div>
                <BackButton/>
            </section>
            }
            {/*einde afgeschermde content*/}

        </>
    );
}

export default DashboardPage;