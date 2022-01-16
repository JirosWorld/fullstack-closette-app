import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useForm} from 'react-hook-form';
import "./SearchPage.css"
import Header from "../../components/header/Header";
import TopNav from "../../components/topnav/TopNav";
import InputField from "../../components/form-elements/inputfield/InputField";
import Slider from "../../components/form-elements/slider/Slider";
import BackButton from "../../components/buttons/BackButton";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";
import MapIcon from "../../assets/icons/icon-map.png";

function SearchPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [toiletEntry, setToiletEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Zoeken :: Closette"
    }, []);

    async function onFormSubmit(data) {
        console.log("Zoek data input:");
        console.log(data);
        setError('');
        toggleLoading(true);

        try {
            const result = await axios.get('http://localhost:8080/toilets');
            setToiletEntry(result);
            console.log("alle result inhoud:");
            console.log(result);
            console.log("alle result.data:");
            console.log(result.data);

        } catch (error) {
            console.log("komt u hier 4?");
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
                title="Zoeken"/>
            <div className="search__page content-wrapper">
                <form className="form-container" onSubmit={handleSubmit(onFormSubmit)}>
                    <InputField
                        errors={errors}
                        register={register}
                        labelText="Stad"
                        labelId="city-field"
                        inputName="city"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Stad invullen is verplicht. Vul aub iets in",
                            },
                            minLength: {
                                value: 1,
                                message: "Je moet meer invullen"
                            }
                        }}
                    />

                    <InputField
                        errors={errors}
                        register={register}
                        labelText="Land"
                        labelId="country-field"
                        inputName="country"
                        validationRules={{
                            maxLength: {
                                value: 50,
                                message: "Te lang"
                            }
                        }}
                    />

                    <section className="nofilters">
                        <Slider
                            errors={errors}
                            register={register}
                            labelId="genderneutraal-check"
                            inputName="genderneutraal"
                            filterAttribute="Genderneutraal"
                            yes="wel"
                            no="niet"
                        >

                        </Slider>

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="free-check"
                            inputName="free"
                            filterAttribute="Gratis"
                            yes="wel"
                            no="niet"
                        >

                        </Slider>

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="accessible-check"
                            inputName="accessible"
                            filterAttribute="Invalidentoilet"
                            yes="wel"
                            no="niet"
                        >

                        </Slider>

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="cleanliness-check"
                            inputName="cleanliness"
                            filterAttribute="Schoon"
                            yes="wel"
                            no="vies"
                        >

                        </Slider>

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="public-check"
                            inputName="public"
                            filterAttribute="Openbaar"
                            yes="wel"
                            no="niet"
                        >

                        </Slider>

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="has_photo-check"
                            inputName="has_photo"
                            filterAttribute="Met foto"
                            yes="wel"
                            no="zonder"
                        />

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="latitude-check"
                            inputName="latitude"
                            filterAttribute="Breedtegraad (latitude)"
                        >
                            Link <Link to="/info/faq-handleiding">naar f.a.q.</Link>
                        </Slider>

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="longitude-check"
                            inputName="longitude"
                            filterAttribute="Lengtegraad (longitude)"
                        >
                            Link <Link to="/info/faq-handleiding">naar f.a.q.</Link>
                        </Slider>

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="has_rating-check"
                            inputName="has_rating"
                            filterAttribute="Met sterren"
                        />

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="has_description-check"
                            inputName="has_description"
                            filterAttribute="Heeft beschrijving"
                        />

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="has_opening_hours-check"
                            inputName="has_opening_hours"
                            filterAttribute="Openingstijden"
                        />

                    </section>

                    <button type="submit">
                        Zoeken
                    </button>
                </form>
                <BackButton/>
                <p>
                    Link <Link to="/searchresults">naar Zoekresultaten Pagina</Link>
                </p>
                <p>
                    Link <Link to="/searchqueries">naar Zoek queries op eigenschappen Pagina</Link>
                </p>
            </div>
            {error && <p className="error-message">{error}</p>}
            <section className="results">
                <ul className="mapped__posts">
                    {loading && <Loader/>}
                    {toiletEntry.data && toiletEntry.data.map((post) => {
                            // console.log("post.data:");
                            // console.log(post);
                            return <li key={post.title && post.title}>
                                <Link
                                    to={`toilets/${post.id}`}>
                            <span className="thumbnail-container">
                                {/*check om te kijken of de thumbnail bestaat
                                (URL mag niet kleiner dan (http://).length zijn,
                                anders default image + link */}

                                {post.hasPhoto.length > 7 ?
                                    <img src={`${post.hasPhoto}`} alt="thumbnail"
                                         className="thumbnail"
                                         width="150"/> :
                                    <span className="no-image">
                                        <img src={noImage} alt="thumbnail"
                                             className="thumbnail transparent" height="150"
                                             width="150"/><p>NO IMAGE</p></span>
                                }
                            </span>
                                </Link>

                                <div className="content-wrapper">
                                    <h2 className="mapped__post__title">
                                        <Link
                                            activeClassName="active-link"
                                            to={`toilets/${post.id}`}><span>{Object.keys(post.title).length > 0
                                            && post.title}</span>
                                        </Link>
                                    </h2>
                                    <span className="mapped__post__author">
                                        Stad: {post.city} |</span>
                                    <span className="mapped__post__detail">
                                        Land <Link
                                        activeClassName="active-link"
                                        to={`toilets/${post.id}`}> "{post.country}"
                                        </Link>
                                    </span>
                                    <span className="mapped__post__votes">Rating: {post.ratingAverage}</span>
                                    <div className="mapped__post__details">
                                        <p>
                                            genderneutraal?: {post.genderneutral
                                            ? <span>Ja</span> : <span>Nee</span>}<br/>
                                            gratis?: {post.free
                                            ? <span>Ja</span> : <span>Nee</span>}<br/>
                                            geplaatst op: {post.postTime}<br/>
                                            openingstijden: {post.openingHours}<br/>
                                            informatie: {post.infoText}<br/>
                                            rolstoeltoegankelijk: {post.accessible ? <span>Ja</span> :
                                            <span>Nee</span>}<br/>
                                            hygi&euml;ne: {post.cleanliness}<br/>
                                            breedtegraad: {post.latitude}<br/>
                                            lengtegraad: {post.longitude}<br/>
                                            Locatie op kaart: <a
                                            href={post.latitude &&
                                            `https://www.openstreetmap.org/?mlat=${post.latitude}&mlon=${post.longitude}&zoom=15}`}
                                            rel="noreferrer" target="_blank">
                                            <img src={MapIcon}
                                                 alt="map"
                                                 width="25"
                                                 className="map-icon"/></a> (externe
                                            link)<br/>
                                            heeft foto?: {post.hasPhoto
                                            ? <span>Ja</span> : <span>Nee</span>}<br/>
                                            heeft rating: {post.ratingAverage}<br/>
                                            {/*gereviewed door: {post.owner.id}<br/>*/}
                                            {/*geplaatst door user: {post.owner.name}*/}
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