import React, {useContext, useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import "./ToiletPost.css";
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
import InputField from "../../components/form-elements/inputfield/InputField";
import {useForm} from "react-hook-form";
import CameraIcon from "../../assets/icons/icon-camera.png";
import PhotoDownload from "../../components/photoupload/PhotoDownload";
import PhotoUpload from "../../components/photoupload/PhotoUpload";
import ThumbnailStrip from "../../components/sections/ThumbnailStrip/ThumbnailStrip";

function ToiletRating() {
    const {user} = useContext(AuthContext);
    console.log(user);
    const {id} = useParams();
    const [toiletEntry, setToiletEntry] = useState({});
    const [patchInfo, setPatchInfo] = useState({});

    // beoordeling berekenen
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    // patch formulier moet alleen zichtbaar zijn wanneer daarom gevraagd wordt
    const [visibility, setVisibility] = useState(true);

    const [loading, toggleLoading] = useState(false);
    const [submitSuccess, toggleSubmitSuccess] = useState(false);
    const [error, setError] = useState('');
    // const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm({ mode: 'onBlur' });

    //mounting fase
    useEffect(() => {

        async function fetchToilet() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/toilets/${id}`);
                setToiletEntry(result.data);
                console.log("alle toilet result.data:");
                console.log(result.data);
                setVisibility(true);

                let sum = 0;
                const itemsFound = result.data.ratings.length;
                for(let i = 0; i < itemsFound; i++){
                    sum += parseInt(result.data.ratings[i].rating);
                }
                console.log("nr popularitySum:", sum);

                function naiveRound(num, decimalPlaces = 0) {
                    var p = Math.pow(10, decimalPlaces);
                    return Math.round(num * p) / p;
                }
                console.log( naiveRound((sum / itemsFound), 2) );
                const averagePopularity = naiveRound((sum / itemsFound), 2);

                setNumberOfRatings(itemsFound);
                console.log("nr itemsFound/setNumberOfRatings:", itemsFound);
                setAverageRating(averagePopularity);
                console.log("Average popularity/setAverageRating:", averagePopularity);

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de data, of... je hebt dit toilet succesvol verwijderd! - (${error.message})`);
                console.error(error);
            }
            toggleLoading(false);
        }
        // console.log("respons:");
        // fetchToilet().then((response) => console.log(response));
        fetchToilet();



    }, []);

    // start aanpassen-functie
    async function onFormSubmitPatchRating(data) {
        setError('');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        try {
            const result = await axios.patch(`http://localhost:8080/ratings/${id}`,
                {
                rating: data.rating
            });
            setPatchInfo(result);
            console.log("Resultaat submitdata useState:");
            console.log(patchInfo);
            toggleSubmitSuccess(true);
            console.log("Data na patch success:");
            console.log(data);

            setTimeout(() => {
                // refresh window, show updated toiletpost
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.reload(true);
            }, 0);

        } catch (e) {
            setError(`(${e.message}) - Wanneer je een 400 error ziet, dan heb je een naam ingevoerd die al bestaat of je hebt een GPS coordinaat gebruikt dat al is ingevoerd - zorg dat titel en locatie UNIEK zijn!`)
            console.error(e);
        }
    }
    // einde aanpassen-functie

    return (
        <>
            <TopNav/>
            <Header
                title="Toilet details"/>
            <main className="toiletpost__page content-wrapper">
                <div className={visibility ? "show" : "hidden"}>
                    <section className="template">
                        <article>
                            {error && <p className="error-message">{error}</p>}
                            {loading && <Loader/>}
                            <div className="template-head">
                                <div className="template-thumbnail">
                                    {/* Dynamisch foto deel start */}
                                    <PhotoDownload />
                                    {/* Dynamisch foto deel einde */}
                                    {user &&
                                    <>
                                        <PhotoUpload/>
                                    </>}
                                </div>
                                <div className="template-intro toilet">
                                    <h1>{toiletEntry && toiletEntry.title}</h1>
                                    <p><em>datum
                                        geplaatst: {toiletEntry && toiletEntry.postTime}</em></p>
                                    <p><strong>Stad: {toiletEntry && toiletEntry.city}</strong></p>
                                    <p>Land: {toiletEntry && toiletEntry.country}</p>
                                    <p>Gemiddelde beoordeling: {averageRating} &#9733; &#x2605; &#9733;
                                    <br/>
                                        (gebaseerd op {numberOfRatings} ratings)</p>

                                    <div>

                                        <p>Alle beoordelingen door gebruikers:</p>

                                    {/* alle beoordelingen van 1 toilet */}
                                        {toiletEntry.ratings && toiletEntry.ratings.map((post) => {

                                                return <p key={post.id}>
                                                    Cijfer: {post.rating}
                                                </p>
                                            })
                                        }

                                    </div>

                                </div>
                            </div>

                            <h3 className="margin-zero">Meer foto's</h3>
                            <ThumbnailStrip/>

                            <div className="template-main-content toilet">
                                <div className="template-main-content--wrapper">
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
                                    <p>rolstoeltoegankelijk: {toiletEntry && toiletEntry.accessible ?
                                        <span>Ja <img src={AccessibleIcon}
                                                      alt="map"
                                                      width="25"
                                                      className="accessible-icon"/> </span> :
                                        <span>Nee</span>}</p>
                                    <p>hygi&euml;ne: {toiletEntry && toiletEntry.cleanliness}</p>
                                    <p>heeft foto?: {toiletEntry && toiletEntry.hasPhoto
                                        ? <span><img src={CameraIcon}
                                                     alt="has visual"
                                                     title="heeft foto"
                                                     width="25"
                                                     className="camera-icon"/></span>
                                        : <span className="tiny-info">Geen foto</span>}
                                    </p>
                                    <p>Foto: <a
                                        href={toiletEntry.latitude && toiletEntry.photo
                                        && `http://localhost:8080/download/${toiletEntry.latitude && toiletEntry.photo.fileName}`}
                                        rel="noreferrer"
                                        target="_blank">{toiletEntry.latitude && toiletEntry.photo
                                    && `⇪ /${toiletEntry.latitude && toiletEntry.photo.fileName}`}
                                    </a></p>
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
                        {user && <>
                            <div className="patch content-wrapper">
                                <p><em>Kloppen deze details niet meer? Klik dan hier om de
                                    informatie aan te
                                    passen!</em></p>
                                <p>
                                    <button type="button" className="add"
                                            onClick={() => setVisibility(false)}>Pas details aan
                                    </button>
                                </p>

                            </div>
                        </>}
                        <div>
                            <p><Link to="/">&lt;&lt; Home</Link></p>
                        </div>
                    </section>
                </div>
                {/*    end of section that will be hidden when patched/put */}
            </main>
            <BackButton/>
            {/* start of section that will be shown when 'pas aan' button is clicked */}
            {user &&
            <div className={visibility ? "hidden" : "show"}>
                <div className="content-wrapper">
                    <h2>Pas toilet details aan</h2>
                    <p>Hier kun je dde naam en de beoordeling aanpassen.</p>
                </div>
                <form className="form-container"
                      onSubmit={handleSubmit(onFormSubmitPatchRating)}
                >
                    <fieldset className="checkbox-filters">
                        <InputField
                            inputType="text"
                            placeholderText="Bijvoorbeeld: Museum bar..."
                            errors={errors}
                            register={register}
                            labelText="Titel/Naam van locatie"
                            labelId="title-field"
                            inputName="title"
                            validationRules={{
                                minLength: {
                                    value: 3,
                                    message: "Te korte titel.",
                                },
                            }}
                        />

                        <InputField
                            inputType="number"
                            errors={errors}
                            register={register}
                            labelText="Beoordeling (geef cijfer van 1 - 10)"
                            labelId="rating-field"
                            inputName="rating"
                            validationRules={{
                                maxLength: {
                                    value: 3,
                                    message: "Te lang, gebruik maximaal 2 tekens (een geheel getal van 1 - 10.",

                                },
                            }}
                        />

                    </fieldset>

                    <button
                        type="submit" className="remove"
                    >
                        Updaten
                    </button>
                    {/* on button click: patch/put update toilet and setVisibility(true) */}

                    {error && <p className="error-message">{error}</p>}
                    {submitSuccess === true &&
                    <div className="confirmation__container">
                        <Loader/>
                        <h3>Toevoegen rating gelukt!</h3>
                        <h2>Deze pagina herlaadt nu opnieuw.</h2>
                    </div>}

                </form>

            </div>
            }
        </>
    );
}

export default ToiletRating;