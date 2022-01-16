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

function SearchPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [toiletEntry, setToiletEntry] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Zoeken op stad, land, naam :: Closette"
    }, []);

    async function onFormSubmitCity(dataCity) {
        console.log("Zoek STAD data input:");
        console.log(dataCity);
        setError('');
        toggleLoading(true);
        try {
            const result = await axios.get(`http://localhost:8080/toilets?city=${dataCity.city}`);
            setToiletEntry(result);
            console.log("alle result inhoud:");
            console.log(result);

        } catch (error) {
            setError("Er is iets misgegaan bij het ophalen van de data");
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

        } catch (error) {
            setError("Er is iets misgegaan bij het ophalen van de data");
            console.error(error);
        }
        toggleLoading(false);
    }

    async function onFormSubmitTitle(dataTitle) {
        console.log("Zoek LAND data input:");
        console.log(dataTitle);
        setError('');
        toggleLoading(true);
        try {
            const result = await axios.get(`http://localhost:8080/toilets?country=${dataTitle.title}`);
            setToiletEntry(result);
            console.log("alle naam zoek inhoud:");
            console.log(result);

        } catch (error) {
            setError("Er is iets misgegaan bij het ophalen van de data");
            console.error(error);
        }
        toggleLoading(false);
    }

    console.log(errors);

    return (
        <>
            <TopNav/>
            <Header
                title="Zoeken op land, stad of naam"/>
            <div className="search__page content-wrapper">
                <h2>'Snel' zoeken</h2>
                <h3>Zoek op stad</h3>
                <form className="form-container city" onSubmit={handleSubmit(onFormSubmitCity)}>
                    <InputField
                        errors={errors}
                        register={register}
                        labelText="Stad"
                        labelId="city-field"
                        inputName="city"
                    />
                    <button type="submit">
                        Zoeken
                    </button>
                </form>

                {/*<h3>Zoek op land</h3>*/}
                {/*<form className="form-container land" onSubmit={handleSubmit(onFormSubmitCountry)}>*/}
                {/*    <InputField*/}
                {/*        errors={errors}*/}
                {/*        register={register}*/}
                {/*        labelText="Land"*/}
                {/*        labelId="country-field"*/}
                {/*        inputName="country"*/}
                {/*        validationRules={{*/}
                {/*            minLength: {*/}
                {/*                value: 1,*/}
                {/*                message: "Je moet meer invullen"*/}
                {/*            }*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <button type="submit">*/}
                {/*        Zoeken*/}
                {/*    </button>*/}
                {/*</form>*/}

                {/*<h3>Zoek op naam</h3>*/}
                {/*<p>Zoek op de naam van de locatie (bijvoorbeeld "museum")</p>*/}
                {/*<form className="form-container title" onSubmit={handleSubmit(onFormSubmitTitle)}>*/}
                {/*    <InputField*/}
                {/*        errors={errors}*/}
                {/*        register={register}*/}
                {/*        labelText="Naam"*/}
                {/*        labelId="title-field"*/}
                {/*        inputName="title"*/}
                {/*    />*/}
                {/*    <button type="submit">*/}
                {/*        Zoeken*/}
                {/*    </button>*/}
                {/*</form>*/}

                <p>
                    Link <Link to="/searchresults">naar ALLE toiletten data</Link>
                </p>
            </div>
            {error && <p className="error-message">{error}</p>}
            <section className="results">
                <ul className="mapped__posts">
                    {loading && <Loader/>}
                    {toiletEntry.data && toiletEntry.data.map((post) => {
                            return <li key={post.title && post.title}>
                                <div className="content-wrapper">
                                    <Link
                                        activeClassName="active-link"
                                        to={`toilets/${post.id}`}><h2 className="mapped__post__title">
                                        <span>{Object.keys(post.title).length > 0
                                        && post.title}</span>
                                    </h2></Link>
                                     <span className="mapped__post__author">Stad: {post.city}</span>
                                      <span className="mapped__post__detail">
                                Land
                                <Link
                                    activeClassName="active-link"
                                    to={`toilets/${post.id}`}> &#127988; "{post.country}"
                                </Link></span>
                                     <span
                                    className="mapped__post__votes">Rating: {post.ratingAverage}</span>.
                                    <div className="mapped__post__details">
                                        <p>
                                            genderneutraal?: {post.genderneutral
                                            ? <span>Ja</span> : <span>Nee</span>}<br/>
                                            gratis?: {post.free
                                            ? <span>Ja</span> : <span>Nee</span>}<br/>
                                            geplaatst op: {post.postTime}<br/>
                                            openingstijden: {post.openingHours}<br/>
                                            informatie: {post.infoText}<br/>
                                            Locatie op kaart: <a
                                            href={post.latitude &&
                                            `https://www.openstreetmap.org/?mlat=${post.latitude}&mlon=${post.longitude}&zoom=15}`}
                                            rel="noreferrer" target="_blank">
                                            <img src={MapIcon}
                                                 alt="map"
                                                 width="25"
                                                 className="map-icon"/></a> (externe
                                            link)<br/>
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