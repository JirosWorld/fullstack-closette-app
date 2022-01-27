import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import "./SearchPage.css"
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

function SearchSCHETS() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [toiletEntry, setToiletEntry] = useState('');
    const [genderneutralToiletEntry, setGenderneutralToiletEntry] = useState(false);
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

    async function onFormSubmitGender(dataGender) {
        console.log("Zoek GENDERNEUTRAAL data input:");
        console.log(dataGender);
        setError('');
        toggleLoading(true);
        try {
            const result = await axios.get(`http://localhost:8080/toilets?title=${dataGender.genderneutral}`);
            setGenderneutralToiletEntry(result);

            // filter op genderneutraal
            if (genderneutralToiletEntry) {
                let toiletFilter = genderneutralToiletEntry.data.filter(function (toilet) {
                    return toilet.genderneutral === true;
                }).map(function (genderneutralToiletEntry) {
                    return genderneutralToiletEntry.title;
                })

                console.log("De enige genderneutrale toiletten zijn:");
                // Printing out the name of true only
                toiletFilter.forEach(function (genderneutralFiltered) {
                    console.log(genderneutralFiltered);
                });
            } else {
                console.log("do nothing");
            }

            setTimeout(() => {
                window.scrollTo({top: 1300, behavior: 'smooth'})
            }, 0);
        } catch (error) {
            setError(`Er is iets misgegaan bij het ophalen van de data - (${error.message})`);
            console.error(error);
        }
        toggleLoading(false);
    }


    return (
        <>
            <TopNav/>
            <Header
                title="Snel-Zoeken"/>
            <div className="searchfilter__page content-wrapper">
                <p>Op deze pagina kun je alle toiletten filteren/sorteren op &oacute;f stad, &oacute;f
                    land &oacute;f locatie-naam, of filteren op alleen de toiletten die genderneutraal zijn.</p>

                <hr/>
                <div className="searchfilter__forms">
                    <form className="form-container city narrow"
                          onSubmit={handleSubmit(onFormSubmitCity)}>
                        <InputField
                            errors={errors}
                            register={register}
                            labelId="city-field"
                            inputName="city"
                            className="narrow"
                        />
                        <button type="submit" className="narrow">
                            Stad
                        </button>
                    </form>

                    <form className="form-container land narrow"
                          onSubmit={handleSubmit(onFormSubmitCountry)}>
                        <InputField
                            errors={errors}
                            register={register}
                            labelId="country-field"
                            inputName="country"
                        />
                        <button type="submit" className="narrow">
                            Land
                        </button>
                    </form>

                    <form className="form-container title narrow"
                          onSubmit={handleSubmit(onFormSubmitTitle)}>
                        <InputField
                            errors={errors}
                            register={register}
                            labelId="title-field"
                            inputName="title"
                        />
                        <button type="submit" className="narrow">
                            Naam
                        </button>
                    </form>

                    <form className="form-container genderneutral narrow"
                          onSubmit={handleSubmit(onFormSubmitGender)}>
                        <InputField
                            errors={errors}
                            register={register}
                            labelId="genderneutral-field"
                            inputName="genderneutral"
                        />
                        <button type="submit" className="narrow">
                            Genderneutraal
                        </button>
                    </form>

                </div>
                <hr/>
                <h4>Zoekresultaten</h4>

            </div>

            <section className="results">
                <ul className="mapped__posts">
                    {error && <p className="error-message">{error}</p>}
                    {loading && <Loader/>}

                    {toiletEntry.data && toiletEntry.data.map((post) => {
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
                                        width="150" height="150"/> :
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
                                    <span
                                        className="mapped__post__votes">Rating: {post.ratingAverage} &#9733; &#x2605; &#9733;</span>
                                    <div className="mapped__post__details">
                                        <p>{post.genderneutral
                                            ? <span><img src={GenderneutralIcon}
                                                         alt="map"
                                                         width="25"
                                                         className="genderneutral-icon"/></span> :
                                            <span>niet genderneutraal</span>}
                                            |

                                            {post.free
                                                ? <span> gratis <img src={FreeIcon}
                                                                     alt="map"
                                                                     width="25"
                                                                     className="free-icon"/></span>
                                                : <span><img src={PaidIcon}
                                                             alt="map"
                                                             width="25"
                                                             className="free-icon"/></span>}
                                            |
                                            invalidenWC: {post.accessible ?
                                                <span> <img src={AccessibleIcon}
                                                            alt="map"
                                                            width="25"
                                                            className="accessible-icon"/> </span> :
                                                <span>Nee</span>}</p>
                                        <p className="location-link">
                                            {post.latitude ?
                                                <>
                                                    Klik voor locatie op kaart:
                                                    <a
                                                        href={post.latitude &&
                                                        `https://www.openstreetmap.org/?mlat=${post.latitude}&mlon=${post.longitude}&zoom=15}`}
                                                        rel="noreferrer" target="_blank">
                                                        <img src={MapIcon}
                                                             alt="map"
                                                             width="25" className="map-icon"/></a>
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

                {/*    End of normal mapping */}

                {/*    Start of Genderneutral filtered only */}

                    {genderneutralToiletEntry.data && genderneutralToiletEntry.data.genderneutral ?

                        <h3>Genderneutrale toiletten</h3>

                        :

                        <span>-</span>

                    }

                    {genderneutralToiletEntry.data && genderneutralToiletEntry.data.genderneutral === true
                    && genderneutralToiletEntry.data.map((post) => {
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
                                        width="150" height="150"/> :
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
                                    <span
                                        className="mapped__post__votes">Rating: {post.ratingAverage} &#9733; &#x2605; &#9733;</span>
                                    <div className="mapped__post__details">
                                        <p>{post.genderneutral
                                            ? <span><img src={GenderneutralIcon}
                                                         alt="map"
                                                         width="25"
                                                         className="genderneutral-icon"/></span> :
                                            <span>niet genderneutraal</span>}
                                            |

                                            {post.free
                                                ? <span> gratis <img src={FreeIcon}
                                                                     alt="map"
                                                                     width="25"
                                                                     className="free-icon"/></span>
                                                : <span><img src={PaidIcon}
                                                             alt="map"
                                                             width="25"
                                                             className="free-icon"/></span>}
                                            |
                                            invalidenWC: {post.accessible ?
                                                <span> <img src={AccessibleIcon}
                                                            alt="map"
                                                            width="25"
                                                            className="accessible-icon"/> </span> :
                                                <span>Nee</span>}</p>
                                        <p className="location-link">
                                            {post.latitude ?
                                                <>
                                                    Klik voor locatie op kaart:
                                                    <a
                                                        href={post.latitude &&
                                                        `https://www.openstreetmap.org/?mlat=${post.latitude}&mlon=${post.longitude}&zoom=15}`}
                                                        rel="noreferrer" target="_blank">
                                                        <img src={MapIcon}
                                                             alt="map"
                                                             width="25" className="map-icon"/></a>
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

                <div className="content-wrapper"><p>
                    Ga terug naar <Link to="/search">de Zoek pagina</Link> om te zoeken op tekst.
                </p></div>
            </section>
        </>
    );
}

export default SearchSCHETS;