import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import "./SearchPage.css";
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

function SearchCityFunction() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [toiletEntry, setToiletEntry] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');


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

    console.log(errors);

    return (
        <>
            <div className="search__page content-wrapper">

                <h3>Zoek op stad</h3>
                <form className="form-container city" onSubmit={handleSubmit(onFormSubmitCity)}>
                    <InputField
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


                <hr/>
                <h4>Zoekresultaten</h4>

            </div>

            <section className="results">
                <ul className="mapped__posts">
                    {error && <p className="error-message">{error}</p>}
                    {loading && <Loader/>}

                    {toiletEntry.length === 0 && <p>Geen resultaten – doe een nieuwe zoekopdracht.</p>}

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
                                    <span
                                        className="mapped__post__votes">Rating: {post.ratingAverage} &#9733; &#x2605; &#9733;</span>
                                    <div className="mapped__post__details">
                                        <p>Beschrijving: {post.infoText}</p>
                                        <p>{post.genderneutral
                                            ? <span><img src={GenderneutralIcon}
                                                         alt="genderneutral"
                                                         width="25"
                                                         className="genderneutral-icon"/></span> :
                                            <span>niet genderneutraal</span>}
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
                                                <span>Nee</span>}
                                            |
                                            foto?: {post.hasPhoto
                                                ? <span><img src={CameraIcon}
                                                             alt="has visual"
                                                             title="heeft foto"
                                                             width="25"
                                                             className="camera-icon"/></span>
                                                : <span className="tiny-info">Nee</span>}
                                        </p>
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

            </section>
        </>
    );
}

export default SearchCityFunction;