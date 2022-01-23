import React, {useEffect} from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import {Link} from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import Accordeon from "../../components/accordeon/Accordeon";
import GPS from "../../assets/img/MapsViewGPSCoordinates-iPhone.jpg";
import FAQimage from "../../assets/img/question-mark-shapes.svg"
import axios from "axios";

function FaqPage() {

    useEffect(() => {
        document.title = "F.a.q en handleiding :: Closette"

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");

    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="F.a.q en handleiding :: Closette"/>
            <main className="faq__page content-wrapper">
                <section className="template">

                    <div className="template-head">
                        <div className="template-thumbnail">
                                <span className="thumbnail-container">
                                        <img src={FAQimage} alt="thumbnail"
                                             height="300"
                                             width="300"/>
                            </span>
                        </div>
                        <div className="template-intro faq">
                            <h3>Veelgestelde vragen en andere zaken</h3>
                            <ul>
                                <li>Handleiding</li>
                                <li>F.A.Q.</li>
                                <li><a href="#privacy">Privacy</a></li>
                            </ul>
                        </div>
                    </div>

                    <article>

                        <h3>Handleiding</h3>
                        <p>Op deze site kun je naar veilige genderneutrale toiletten zoeken.
                            Niet-ingelogde
                            gebruikers kunnen <Link to="/search">toiletten zoeken</Link> en alle
                            data bekijken. Ook het <Link to="/news">Nieuws</Link> en de
                            onderliggende artikelen zijn openbaar.</p>

                        <h3>F.A.Q. ~ veelgestelde vragen</h3>

                        <div className="wrapper">
                            <Accordeon title="Wat kunnen ingelogde gebruikers?">
                                <p>Op deze site kun je, wanneer je bent ingelogd, veilige toiletten
                                    inzenden zodat anderen ze kunnen vinden. Bij het plaatsen van
                                    een nieuwe toilet-locatie kun je allerlei opties per toilet
                                    aangeven. Alles wat je invult, wordt zichtbaar in de
                                    toilettenlijst. De enige opties die &eacute;cht verplicht zijn
                                    om in te vullen, zijn: <strong>naam, stad en land</strong>.</p>
                            </Accordeon>
                            <Accordeon title="Hoe kan ik de inhoud corrigeren?">
                                <p>Alleen ingelogde gebruikers kunnen nieuwe locaties toevoegen of
                                    bestaande inhoud aanpassen/verbeteren. Er is ook maar maximaal 1
                                    foto per locatie te zien; dus als je toevvallig een mooiere foto
                                    hebt, dan mag je deze toevoegen. Maak wel <Link to="/signup">eerst
                                        een account aan</Link>.</p>
                            </Accordeon>
                            <Accordeon title="Hoe kan ik zo'n kaart-symbooltje aanklikbaar maken?">
                                <p>&Aacute;ls de volledige GPS locatie is ingevuld dan wordt de
                                    "<em>Link naar
                                        locatie</em>" automatisch aanklikbaar! Wanneer je daarop
                                    klikt dan word je naar een externe website gestuurd: die van
                                    Open Streetmap - deze optie zorgt ervoor dat je de locaties ook
                                    kunt vinden wanneer je de weg niet weet van de stad waar je
                                    bent.</p>
                            </Accordeon>
                            <Accordeon title="Wat betekenen die locatie getallen?">
                                <p>Alle plekken/punten op de wereldbol zijn te beschrijven met GPS
                                    co&ouml;rdinaten:
                                    de breedtegraad (Oost/West) en de lengtegraad (Noord/Zuid).
                                    Ezelsbruggetje: breedtegraad
                                    (latitude)
                                    komt altijd v&oacute;&oacute;r
                                    lengtegraad (longitude) - dus op alfabetische volgorde. Ook in
                                    het
                                    Engels zijn ze toevallig in alfabetische volgorde: [latitude,
                                    longitude].</p>
                            </Accordeon>
                            <Accordeon title="Hoe vind ik mijn GPS locatie? (ENG)">
                                <p>Open Maps on your iPhone or iPad and then follow these steps to
                                    get
                                    your
                                    current location’s GPS coordinates.</p>
                                <ol>
                                    <li>Tap the <strong>current location</strong> button on the top
                                        right.
                                    </li>
                                    <li>When the blue circle for your spot appears on the
                                        map, <strong>tap</strong> it.
                                    </li>
                                    <li><strong>Swipe up</strong> from the bottom to view full
                                        details
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
                                    <figcaption id="caption" className="gps">Jouw GPS coordinaten in
                                        de detail-weergave in iOS.
                                    </figcaption>
                                </figure>
                            </Accordeon>
                            <Accordeon title="Hoe voer ik zo'n GPS getal correct in?">
                                <p>Als je de GPS coördinaten weet van een nieuw genderneutraal
                                    toilet dat je hebt gevonden, en deze wilt toevoegen, zorg er dan
                                    voor dat je superstrak deze notatie aanhoudt:<br/>- start met
                                    een positief of negatief cijfer van 1 to 2 cijfers en <strong>typ
                                        dan een punt</strong> - vooral die punt is belangrijk. De
                                    cijfers na de punt geven de precisie aan.</p>
                                <p>Geldige coördinaten zijn bijvoorbeeld deze:
                                    <br/>50.12345
                                    <br/>-50.12345
                                    <br/>4.54321
                                    <br/>-4.54321</p>
                                <p>Wanneer je een 400 error ziet, dan heb je een naam ingevoerd die
                                    al bestaat of je hebt een GPS coordinaat gebruikt dat al eerder
                                    is ingevoerd - zorg dat titel en locatie UNIEK zijn. Alle andere
                                    velden hoeven niet uniek te zijn (zoals stad en land).</p>
                            </Accordeon>
                        </div>
                        <h3 id="privacy">Privacy</h3>
                        <p>Op deze stateless server worden GEEN gegevens bewaard. Ook de gegevens
                            uit het contactformulier-template worden na het examen vernietigd.</p>
                    </article>
                    <div>
                        <p><Link to="/">&lt;&lt; Home</Link></p>
                    </div>


                </section>
                <BackButton/>
            </main>
        </>
    )
        ;
}

export default FaqPage;