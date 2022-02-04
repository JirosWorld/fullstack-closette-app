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
import Slider from "../../components/form-elements/slider/Slider";
import InputTextarea from "../../components/form-elements/inputfield/InputTextarea";
import {useForm} from "react-hook-form";
import CameraIcon from "../../assets/icons/icon-camera.png";
import PhotoDownload from "../../components/photoupload/PhotoDownload";
import PhotoUpload from "../../components/photoupload/PhotoUpload";
import ThumbnailStrip from "../../components/sections/ThumbnailStrip/ThumbnailStrip";

function ToiletPost() {
    const {user} = useContext(AuthContext);
    console.log(user);
    const {id} = useParams();
    const [toiletEntry, setToiletEntry] = useState({});
    const [patchInfo, setPatchInfo] = useState({});
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [visibility, setVisibility] = useState(true);
    const [loading, toggleLoading] = useState(false);
    const [submitSuccess, toggleSubmitSuccess] = useState(false);
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm({ mode: 'onBlur' });

    //mounting
    useEffect(() => {
        document.title = "Toilet details :: Closette"
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");

        async function fetchToilets() {

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
                function naiveRound(num, decimalPlaces = 0) {
                    var p = Math.pow(10, decimalPlaces);
                    return Math.round(num * p) / p;
                }
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

        fetchToilets();

    }, []);

    // start patch
    async function onFormSubmitPatchToilet(data) {
        setError('');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        try {
            const result = await axios.patch(`http://localhost:8080/toilets/${id}`, {
                title: data.title,
                address: data.address,
                city: data.city,
                country: data.country,
                free: data.free,
                accessible: data.accessible,
                genderneutral: data.genderneutral,
                infoText: data.infoText,
                cleanliness: data.cleanliness,
                latitude: data.latitude,
                longitude: data.longitude,
                hasPhoto: data.hasPhoto,
                openingHours: data.openingHours
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
    // end patch

    // start delete
    async function deleteFunction() {
        if (window.confirm("Weet je zeker dat je dit toilet helemaal wilt verwijderen?")) {
            try {
                setPatchInfo(await axios.delete(`http://localhost:8080/toilets/${id}`));
                setToiletEntry(await axios.delete(`http://localhost:8080/toilets/${id}`));
                await axios.delete(`http://localhost:8080/toilets/${id}`);
                console.log("Deleten volbracht.");
                setVisibility(true);
                // window.location.reload(true);
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }, 0);
            } catch (error) {
                setError(`Dit toilet bestaat niet meer ... je hebt dit 
                toilet succesvol verwijderd! - (${error.message})`);
                console.error(error.message);
            }
        } else {
            console.log("Deleten gecanceled.");
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 0);
        }
    }
    // end delete

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

                                    <PhotoDownload />

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
                                    <p>Gemiddelde beoordeling: {averageRating}
                                        {averageRating < 7
                                        && <span> &#9733; &#x2605; </span>}

                                        {averageRating > 7
                                        && <span> &#9733; &#x2605; &#9733; &#x2605; &#9733;</span>}
                                    </p>
                                    <p className="tiny-info">(gebaseerd op <em>{numberOfRatings}</em> ratings)</p>

                                </div>
                            </div>

                            <h3 className="margin-zero">Meer foto's</h3>
                            <ThumbnailStrip/>

                            <div className="template-main-content toilet">
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
                                        ? <span><img src={CameraIcon}
                                                     alt="has visual"
                                                     title="heeft foto"
                                                     width="25"
                                                     className="camera-icon"/></span>
                                        : <span className="tiny-info">Geen foto</span>}
                                    </p>
                                    <p>Foto: <a
                                        href={toiletEntry.photo && toiletEntry.photo
                                        && `http://localhost:8080/download/${toiletEntry.photo && toiletEntry.photo.fileName}`}
                                        rel="noreferrer"
                                        target="_blank">{toiletEntry.photo && toiletEntry.photo
                                    && `⇪ /${toiletEntry.photo && toiletEntry.photo.fileName}`}
                                    </a></p>
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
                                    <div className="ratings-list">

                                        <h4>Alle beoordelingen door gebruikers:</h4>

                                        <ul>
                                        {toiletEntry.ratings && toiletEntry.ratings.map((post) => {

                                            return <li key={post.id}>
                                                Cijfer: {post.rating}
                                            </li>
                                        })
                                        }
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </article>

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
                                <p>
                                    <button type="button"
                                            onClick={deleteFunction}
                                            className="delete">Verwijder dit toilet &#10060;
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
                    <p>Hier kun je elke detail aanpassen dat je maar wilt. De informatie over dit
                        toilet die reeds is ingevuld, blijft staan. Alleen de velden die je hier
                        aanpast, zullen worden veranderd.</p>
                </div>
                <form className="form-container"
                      onSubmit={handleSubmit(onFormSubmitPatchToilet)}
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
                            inputType="text"
                            placeholderText="Bijvoorbeeld: Barcelona..."
                            errors={errors}
                            register={register}
                            labelText="Stad/Plaats"
                            labelId="city-field"
                            inputName="city"
                            validationRules={{
                                minLength: {
                                    value: 1,
                                    message: "Te korte naam, gebruik minstens 2 tekens.",
                                },
                                maxLength: {
                                    value: 85,
                                    message: "Te lange plaatsnaam, gebruik maximaal 85 tekens.",

                                },
                            }}
                        />

                        <InputField
                            inputType="text"
                            placeholderText="Bijvoorbeeld: Kalverstraat 92, 1012 PH Amsterdam..."
                            errors={errors}
                            register={register}
                            labelText="Adres"
                            labelId="address-field"
                            inputName="address"
                        />

                        <InputField
                            inputType="text"
                            placeholderText="Bijvoorbeeld: Kenia..."
                            errors={errors}
                            register={register}
                            labelText="Land"
                            labelId="country-field"
                            inputName="country"
                            validationRules={{
                                minLength: {
                                    value: 1,
                                    message: "Te korte naam, gebruik minstens 2 tekens.",
                                },
                                maxLength: {
                                    value: 85,
                                    message: "Te lange regionaam, gebruik maximaal 85 tekens.",

                                },
                            }}
                        />

                        <InputField
                            inputType="text"
                            placeholderText="Bijvoorbeeld: 52.3700"
                            errors={errors}
                            register={register}
                            labelText="Breedtegraad (latitude)"
                            labelId="latitude-field"
                            inputName="latitude"
                            validationRules={{
                                minLength: {
                                    value: 5,
                                    message: "Te kort coördinaat, gebruik minstens 5 tekens.",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Te lang coördinaat, gebruik maximaal 12 tekens.",

                                },
                            }}
                        />

                        <InputField
                            inputType="text"
                            placeholderText="Bijvoorbeeld: 4.8900"
                            errors={errors}
                            register={register}
                            labelText="Lengtegraad (longitude)"
                            labelId="longitude-field"
                            inputName="longitude"
                            validationRules={{
                                minLength: {
                                    value: 4,
                                    message: "Te kort coördinaat, gebruik minstens 5 tekens.",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Te lang coördinaat, gebruik maximaal 12 tekens.",

                                },
                            }}
                        />

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="genderneutral-check"
                            inputName="genderneutral"
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
                            labelId="has_photo-check"
                            inputName="hasPhoto"
                            filterAttribute="Met foto"
                            yes="met"
                            no="zonder"
                        >
                            (upload <em>n&aacute;</em> invullen!)
                        </Slider>

                        <InputField
                            inputType="text"
                            placeholderText="Bijvoorbeeld: zeer schoon op doordeweekse dagen..."
                            errors={errors}
                            register={register}
                            labelText="Schoon/Vies"
                            labelId="cleanliness-field"
                            inputName="cleanliness"
                            validationRules={{
                                maxLength: {
                                    value: 80,
                                    message: "Te lang, gebruik maximaal 80 tekens.",

                                },
                            }}
                        />

                        <InputTextarea
                            rowNr={6}
                            columnNr={30}
                            placeholderText="Typ hier een beschrijving van o.a. hoe het toilet te bereiken is (is het openbaar?) e.a. bijzonderheden, wees zo gedetailleerd als je wilt..."
                            errors={errors}
                            register={register}
                            labelText="Info beschrijving:"
                            labelId="infoText-field"
                            inputName="infoText"
                            validationRules={{
                                maxLength: {
                                    value: 500,
                                    message: "Te lang, gebruik maximaal 500 tekens.",

                                },
                            }}
                        />

                        <InputField
                            inputType="text"
                            placeholderText="Bijvoorbeeld: 9h - 17h..."
                            errors={errors}
                            register={register}
                            labelText="Openingstijden"
                            labelId="openingHours-field"
                            inputName="openingHours"
                            validationRules={{
                                maxLength: {
                                    value: 80,
                                    message: "Te lang, gebruik maximaal 80 tekens.",

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

                    <button
                        onClick={() => window.location.reload(true)}
                    >
                        Cancel
                    </button>

                    {error && <p className="error-message">{error}</p>}
                    {submitSuccess === true &&
                    <div className="confirmation__container">
                        <Loader/>
                        <h3>Aanpassen gelukt!</h3>
                        <h2>Deze pagina herlaadt nu opnieuw.</h2>
                    </div>}

                </form>

            </div>
            }
        </>
    );
}

export default ToiletPost;