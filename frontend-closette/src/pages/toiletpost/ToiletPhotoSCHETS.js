import React, {useContext, useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import axios from "axios";
import MapIcon from "../../assets/icons/icon-map.png";
import Loader from "../../components/loader/Loader";
import AccessibleIcon from "../../assets/icons/icon-accessible.svg";
import GenderneutralIcon from "../../assets/icons/icon-transgenderneutral.svg";
import FreeIcon from "../../assets/icons/icon-money-free-gratis.png";
import PaidIcon from "../../assets/icons/icon-money-pay-euro.png";
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";

function ToiletPhotoSCHETS() {
    const {user} = useContext(AuthContext);
    console.log(user);
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
                setError(`Er is iets misgegaan bij het ophalen van de data - (${error.message})`);
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
            <main className="toiletpost__page content-wrapper">

                <section className="template">
                    <article>
                        {error && <p className="error-message">{error}</p>}
                        {loading && <Loader/>}
                        <div className="template-head">
                            <div className="template-thumbnail">
                                <span className="thumbnail-container">
                                    {/* bestaat-foto-check */}
                                    {toiletEntry && toiletEntry.photo ?
                                        <img src={`${toiletEntry.photo}`} alt="thumbnail"
                                             className="thumbnail-wide"
                                             width="300"/> :
                                        <>
                                        <span className="no-image">
                                        <img src={noImage} alt="thumbnail"
                                             className="thumbnail-wide transparent" height="300"
                                             width="300"/><p>NO IMAGE</p></span>
                                        </>
                                    }
                            </span>
                                { user && <>
                                    <p>Geen foto te zien?
                                    <form>
                                        <label htmlFor="photo">Upload hier een nieuwe:</label>
                                        <input type="file" id="narrow"
                                               name="photo"/><br/>
                                        <input name="photo" type="submit" value="Uploaden" id="narrow"/>
                                    </form>
                                    </p>
                                </>}
                            </div>
                            <div className="template-intro toilet">
                                <h1>{toiletEntry && toiletEntry.title}</h1>
                                <p><em>datum geplaatst: {toiletEntry && toiletEntry.postTime}</em></p>
                                <p><strong>Stad: {toiletEntry && toiletEntry.city}</strong></p>
                                <p>Land: {toiletEntry && toiletEntry.country}</p>
                                <p>beoordeling: {toiletEntry && toiletEntry.ratingAverage} ★★★</p>

                            </div>
                        </div>
                        <div className="template-main-content toilet">
                            <p>Endpoints voor photos: &#123;<br/>
                                * POST [/multiple/upload]<br/>
                                * POST [/single/uploadDb]<br/>
                                * GET [/zipDownload/db]<br/>
                                * GET [/zipDownload]<br/>
                                * GET [/download/&#123;fileName&#125;]<br/>
                                * GET [/downloadFromDB/&#123;fileName&#125;]<br/>
                                * POST [/multiple/upload/db]
                            </p>
                            <div className="template-main-content--wrapper">
                                <p>Beschrijving: {toiletEntry && toiletEntry.infoText}</p>
                                <p>Adres: {toiletEntry && toiletEntry.address}</p>
                                <p>Stad: {toiletEntry && toiletEntry.city}</p>
                                <p>Land: {toiletEntry && toiletEntry.country}</p>
                                <p>genderneutraal: {toiletEntry.genderneutral
                                    ? <span><img src={GenderneutralIcon}
                                                 alt="map"
                                                 width="25"
                                                 className="genderneutral-icon"/></span> :
                                    <span>Nee</span>}</p>
                                <p>gratis: {toiletEntry.free
                                    ? <span>Ja <img src={FreeIcon}
                                                    alt="map"
                                                    width="25"
                                                    className="free-icon"/></span>
                                    : <span>Nee <img src={PaidIcon}
                                                     alt="map"
                                                     width="25"
                                                     className="free-icon"/></span>}</p>
                                <p>openingstijden: {toiletEntry && toiletEntry.openingHours}</p>
                                <p>rolstoeltoegankelijk: {toiletEntry && toiletEntry.accessible ?
                                    <span>Ja <img src={AccessibleIcon}
                                                  alt="map"
                                                  width="25"
                                                  className="accessible-icon"/> </span> :
                                    <span>Nee</span>}</p>
                                <p>hygi&euml;ne: {toiletEntry && toiletEntry.cleanliness}</p>
                                <p>heeft foto?: {toiletEntry && toiletEntry.hasPhoto
                                    ? <span>Ja</span> : <span>Nee</span>}</p>
                                <p>breedtegraad: {toiletEntry.latitude && toiletEntry.latitude}</p>
                                <p>lengtegraad: {toiletEntry.longitude && toiletEntry.longitude}</p>
                                <p>Locatie op kaart: <a
                                    href={toiletEntry.latitude &&
                                    `https://www.openstreetmap.org/?mlat=${toiletEntry && toiletEntry.latitude}&mlon=${toiletEntry && toiletEntry.longitude}&zoom=15}`}
                                    rel="noreferrer" target="_blank">
                                    <img src={MapIcon}
                                         alt="map"
                                         width="25" className="map-icon"/> (externe
                                    link)</a></p>
                            </div>
                        </div>
                    </article>
                    {/* PUT- en PATCH-requests mogen alleen door ingelogde users gedaan worden */}
                    { user && <>
                    <div className="patch content-wrapper">
                        <p><em>Kloppen deze details niet meer? Klik dan hier om de informatie aan te
                            passen!</em></p>
                        <p><button type="button">Pas aan</button></p>
                    </div>
                    </>}
                    <div>
                        <p><Link to="/">&lt;&lt; Home</Link></p>
                    </div>
                </section>
            </main>
            <BackButton/>
        </>
    );
}

export default ToiletPhotoSCHETS;