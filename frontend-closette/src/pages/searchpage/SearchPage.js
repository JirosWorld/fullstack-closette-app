import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import "./SearchPage.css";
import Header from "../../components/header/Header";
import TopNav from "../../components/topnav/TopNav";
import InputField from "../../components/form-elements/inputfield/InputField";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import MapIcon from "../../assets/icons/icon-map.png";
import GenderneutralIcon from "../../assets/icons/icon-transgenderneutral.svg";
import FreeIcon from "../../assets/icons/icon-money-free-gratis.png";
import PaidIcon from "../../assets/icons/icon-money-pay-euro.png";
import AccessibleIcon from "../../assets/icons/icon-accessible.svg";
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";
import CameraIcon from "../../assets/icons/icon-camera.png";
import {ReactComponent as SearchLookIcon} from "../../assets/icons/icon-lines-search-jiro.svg";
import {ReactComponent as ExternalLink} from "../../assets/icons/icon-lines-logout.svg";

function SearchPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [toiletEntry, setToiletEntry] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Zoeken op stad, land, naam :: Closette"

        setTimeout(() => {
            window.scrollTo({top: 0, behavior: 'smooth'})
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");
    }, []);

    async function onFormSubmitCity(dataCity) {
        console.log("Zoek STAD data input:");
        console.log(dataCity);
        setError('');
        toggleLoading(true);
        console.log("toiletEntry als string:");
        console.log(toiletEntry);
        try {
            const result = await axios.get(`http://localhost:8080/toilets?city=${dataCity.city}`);
            setToiletEntry(result);
            console.log("alle result inhoud:");
            console.log(result);
            setTimeout(() => {
                window.scrollTo({top: 1100, behavior: 'smooth'})
            }, 0);
            console.log("De pagina begint met de window naar boven gescrolld");

        } catch (error) {
            setError(`Er is iets misgegaan bij het ophalen van de data - (${error.message})`);
            console.error(error);
        }
        toggleLoading(false);
    }

    async function onFormSubmitCountry(dataCountry) {
        console.log("Zoek LAND data input:");
        console.log(dataCountry);
        setError('');
        toggleLoading(true);
        try {
            const result = await axios.get(`http://localhost:8080/toilets?country=${dataCountry.country}`);
            setToiletEntry(result);
            console.log("alle country zoek inhoud:");
            console.log(result);
            setTimeout(() => {
                window.scrollTo({top: 1200, behavior: 'smooth'})
            }, 0);
        } catch (error) {
            setError(`Er is iets misgegaan bij het ophalen van de data - (${error.message})`);
            console.error(error);
        }
        toggleLoading(false);
    }

    async function onFormSubmitTitle(dataTitle) {
        console.log("Zoek TITEL data input:");
        console.log(dataTitle);
        setError('');
        toggleLoading(true);
        try {
            const result = await axios.get(`http://localhost:8080/toilets?title=${dataTitle.title}`);
            setToiletEntry(result);
            console.log("alle naam zoek inhoud:");
            console.log(result);
            setTimeout(() => {
                window.scrollTo({top: 1300, behavior: 'smooth'})
            }, 0);
        } catch (error) {
            setError(`Er is iets misgegaan bij het ophalen van de data - (${error.message})`);
            console.error(error);
        }
        toggleLoading(false);
    }

    console.log(errors);

    return (
        <>
            <TopNav/>
            <Header
                title="Snel-Zoeken"/>
            <main className="search__page content-wrapper">
                <p>Op deze pagina kun je snel-zoeken op basis van &oacute;f stad, &oacute;f
                    land &oacute;f bedrijfs-naam. Scroll naar beneden, nadat je een zoek-knop hebt
                    ingedrukt, om alle zoekresultaten te zien.
                </p>

                <h3>Zoek op naam</h3>
                <form className="form-container title" onSubmit={handleSubmit(onFormSubmitTitle)}>
                    <InputField
                        inputType="text"
                        errors={errors}
                        register={register}
                        labelText="Naam"
                        labelId="title-field"
                        inputName="title"
                        placeholderText="Bijvoorbeeld: Bar..."
                    />
                    <button type="submit">
                        Zoeken
                    </button>
                </form>

                <h3>Zoek op stad</h3>
                <form className="form-container city" onSubmit={handleSubmit(onFormSubmitCity)}>
                    <InputField
                        inputType="text"
                        errors={errors}
                        register={register}
                        labelText="Stad"
                        labelId="city-field"
                        inputName="city"
                        placeholderText="Bijvoorbeeld: Utr..."
                    />
                    <button type="submit">
                        Zoeken
                    </button>
                </form>

                <h3>Zoek op land</h3>
                <form className="form-container country" onSubmit={handleSubmit(onFormSubmitCountry)}>
                    <InputField
                        inputType="text"
                        errors={errors}
                        register={register}
                        labelText="Land"
                        labelId="country-field"
                        inputName="country"
                        placeholderText="Bijvoorbeeld: USA..."
                        validationRules={{
                            minLength: {
                                value: 1,
                                message: "Je moet meer invullen"
                            }
                        }}
                    />
                    <button type="submit">
                        Zoeken
                    </button>
                </form>

                <hr/>
                <p><Link to="/searchresults">
                    <SearchLookIcon className="svg-lookingglass-inline" alt="search icon"/></Link>
                    <em>(Of bekijk direct <Link to="/searchresults">ALLE toiletten
                        data hier</Link> zonder
                        te zoeken).</em></p>


                <hr/>
                <h4>Zoekresultaten</h4>

            </main>

            <section className="results">
                <ul className="mapped__posts">
                    {error && <p className="error-message">{error}</p>}
                    {loading && <Loader/>}

                    {toiletEntry.length === 0 && <p>Geen resultaten – doe een nieuwe zoekopdracht.</p>}

                    {toiletEntry.data && toiletEntry.data.map((post) => {


                        let sum = 0;
                        const itemsFound = post.ratings.length;
                        for(let i = 0; i < itemsFound; i++){
                            sum += parseInt(post.ratings[i].rating);
                        }
                        console.log("nr popularitySum:", sum);

                        function naiveRound(num, decimalPlaces = 0) {
                            var p = Math.pow(10, decimalPlaces);
                            return Math.round(num * p) / p;
                        }
                        console.log( naiveRound((sum / itemsFound), 2) );
                        const averagePopularity = naiveRound((sum / itemsFound), 2);

                        // setAverageRating(averagePopularity);
                        console.log("Average popularity/setAverageRating:", averagePopularity);

                        return <li key={post.id && post.title}>

                                <Link
                                    to={`toilets/${post.id}`}>
                            <span className="thumbnail-container">
                                {/*check om te kijken of de thumbnail bestaat*/}
                                {post.photo ?
                                    <img
                                        src={`http://localhost:8080/download/${post.photo.fileName}`}
                                        alt="thumbnail"
                                        className="thumbnail"
                                        width="150" height="150"/>

                                    :
                                    <span className="no-image">
                                        <img src={noImage} alt="thumbnail"
                                             className="thumbnail transparent" height="150"
                                             width="150"/><p>NO IMAGE</p></span>
                                }
                            </span>
                                </Link>

                                <div className="content-wide">
                                    <Link
                                        className="active-link"
                                        to={`toilets/${post.id}`}><h2 className="mapped__post__title">
                                        <span>{Object.keys(post.title).length > 0
                                        && post.title}</span>
                                    </h2></Link>
                                    <span className="mapped__post__author">{post.city}</span>
                                    <span className="mapped__post__detail">
                                        &#127988; "{post.country}"
                                    </span><br/>
                                    <p className="mapped__post__votes">Beoordeling:
                                        {averagePopularity ||
                                        <span className="tiny-info">  &nbsp; &#10060; 0 stemmen</span>}
                                        {averagePopularity < 7
                                        && <span> &#9733; &#x2605; </span>}

                                        {averagePopularity > 7
                                        && <span> &#9733; &#x2605; &#9733; &#x2605; &#9733;</span>}
                                    </p>
                                    <div className="mapped__post__details">
                                        <p>Beschrijving: {post.infoText}</p>
                                        <p>{post.genderneutral
                                            ? <span><img src={GenderneutralIcon}
                                                         alt="genderneutral"
                                                         width="25"
                                                         className="genderneutral-icon"/></span> :
                                            <span className="tiny-info">niet genderneutraal</span>}
                                            | 

                                            {post.free
                                                ? <span>gratis <img src={FreeIcon}
                                                                     alt="free"
                                                                     width="25"
                                                                     className="free-icon"/></span>
                                                : <span><img src={PaidIcon}
                                                             alt="paid"
                                                             width="25"
                                                             className="free-icon"/></span>}
                                            |
                                            invalidenWC: {post.accessible ?
                                                <span> <img src={AccessibleIcon}
                                                            alt="accessible"
                                                            width="25"
                                                            className="accessible-icon"/> </span> :
                                                <span className="tiny-info"> Nee</span>}
                                            |
                                            foto?: {post.hasPhoto
                                                ? <span><img src={CameraIcon}
                                                             alt="has visual"
                                                             title="heeft foto"
                                                             width="25"
                                                             className="camera-icon"/></span>
                                                : <span className="tiny-info">Nee</span>}
                                        </p>
                                        <p>Foto: <a
                                            href={post.photo
                                            && `http://localhost:8080/download/${post.photo.fileName}`}
                                            rel="noreferrer"
                                            target="_blank">{post.photo
                                        && `⇪ /${post.photo.fileName}`}
                                        </a></p>
                                        <p className="location-link">
                                            {post.latitude ?
                                            <>
                                                Klik voor locatie op kaart:
                                                <a
                                                    href={post.latitude &&
                    `https://www.openstreetmap.org/?mlat=${post.latitude}&mlon=${post.longitude}&zoom=15}`}
                                                    rel="noreferrer"
                                                    target="_blank">

                                                    <ExternalLink
                                                        className="svg-external"
                                                        alt="external link"
                                                    />
                                                    <img src={MapIcon}
                                                         alt="map"
                                                         width="25" className="map-icon"/>

                                                    </a>
                                            </>
                                                :
                                                <>(geen GPS locatie)</>
                                            }
                                        </p>
                                    </div>
                                </div>
                                {/* <!-- end content wrapper --> */}
                            </li>
                        }
                    )}
                </ul>
            </section>
        </>
    );
}

export default SearchPage;