import React from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import {Link} from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import Accordeon from "../../components/accordeon/Accordeon";
import GPS from "../../assets/img/MapsViewGPSCoordinates-iPhone.jpg";

function FaqPage() {
    return (
        <>
            <TopNav/>
            <Header
                title="F.a.q en handleiding"/>
            <div className="newspost__page content-wrapper">
                <section>
                    <article>
                        <h3>Inhoud</h3>
                        <ul>
                            <li>Handleiding</li>
                            <li>F.A.Q.</li>
                            <li><a href="#privacy">Privacy</a></li>
                        </ul>
                        <h3>Handleiding</h3>
                        <p>bij het plaatsen van een nieuwe toilet-locatie kun je allerlei opties per toilet aangeven. De enige die echt verplicht zijn om in te vullen, zijn: naam, stad en land.</p>
                        <p>Als je de GPS coördinaten weet van de plek die je hebt gevonden, zorg er dan voor dat je superstrak deze notatie aanhoudt: start met een positief of negatief cijfer van 1 to 2 cijfers en <strong>typ
                            dan een punt</strong> - vooral die punt is belangrijk. De cijfers na de punt geven de precisie aan.</p>
                        <p>Geldige coördinaten zijn bijvoorbeeld deze:
                        <br/>50.12345
                        <br/>-50.12345
                        <br/>4.54321
                        <br/>-4.54321</p>
                        <p>Wanneer je een 400 error ziet, dan heb je een naam ingevoerd die al bestaat of je hebt een GPS coordinaat gebruikt dat al eerder is ingevoerd - zorg dat titel en locatie UNIEK zijn. Alle andere velden hoeven niet uniek te zijn (zoals stad en land).</p>
                        <h3>F.A.Q. ~ veelgestelde vragen</h3>
                        <div className="wrapper">
                            <Accordeon title="Wat betekenen die locatie getallen?">
                                <p>Alle plekken op de wereld zijn te beschrijven met GPS
                                    co&ouml;rdinaten:
                                    de breedtegraad en lengtegraad. Ezelsbruggetje: breedtegraad
                                    (latitude)
                                    komt altijd v&oacute;&oacute;r
                                    lengtegraad (longitude) - dus op alfabetische volgorde. Ook in het
                                    Engels zijn ze toevallig in alfabetische volgorde: [latitude,
                                    longitude].</p>
                            </Accordeon>
                            <Accordeon title="Hoe vind ik mijn GPS locatie? (ENG)">
                                <p>Open Maps on your iPhone or iPad and then follow these steps to get
                                    your
                                    current location’s GPS coordinates.</p>
                                <ol>
                                    <li>Tap the <strong>current location</strong> button on the top
                                        right.
                                    </li>
                                    <li>When the blue circle for your spot appears on the
                                        map, <strong>tap</strong> it.
                                    </li>
                                    <li><strong>Swipe up</strong> from the bottom to view full details
                                        for
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
                        <h3 id="privacy">Privacy</h3>
                        <p>Op deze stateless server worden GEEN gegevens bewaard. Ook de gegevens uit het contactformulier-template worden na het examen vernietigd.</p>
                    </article>
                    <div>
                        <Link to="/">Terug naar Home</Link>
                        <p>
                            Link <Link to="/searchresults">naar Zoekresultaten Pagina</Link>
                        </p>
                        <p>
                            Link <Link to="/searchqueries">naar Zoek queries op eigenschappen Pagina</Link>
                        </p>
                    </div>
                </section>
                <BackButton/>
            </div>
        </>
    );
}

export default FaqPage;