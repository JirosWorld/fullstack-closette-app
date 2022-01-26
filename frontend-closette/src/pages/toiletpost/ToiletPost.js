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
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";
import InputField from "../../components/form-elements/inputfield/InputField";
import Slider from "../../components/form-elements/slider/Slider";
import InputTextarea from "../../components/form-elements/inputfield/InputTextarea";
import {useForm} from "react-hook-form";

function ToiletPost() {
    const {user} = useContext(AuthContext);
    console.log(user);
    const {id} = useParams();
    const [toiletEntry, setToiletEntry] = useState({});
    const [patchInfo, setPatchInfo] = useState({});

    // patch formulier moet alleen zichtbaar zijn wanneer daarom gevraagd wordt
    const [visibility, setVisibility] = useState(true);

    const [loading, toggleLoading] = useState(false);
    const [submitSuccess, toggleSubmitSuccess] = useState(false);
    const [error, setError] = useState('');
    // const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm({ mode: 'onBlur' });

    //mounting fase
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

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de data, of... je hebt dit toilet succesvol verwijderd! - (${error.message})`);
                console.error(error);
            }
            toggleLoading(false);
        }
        fetchToilets();
    }, []);

    // start aanpassen-functie
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
                latitude: data.latitude,
                longitude: data.longitude,
                hasPhoto: data.hasPhoto,
                openingHours: data.openingHours,
                ratingAverage: data.ratingAverage,
            });
            setPatchInfo(result);
        } catch (e) {
            setError(`(${e.message}) - Wanneer je een 400 error ziet, dan heb je een naam ingevoerd die al bestaat of je hebt een GPS coordinaat gebruikt dat al is ingevoerd - zorg dat titel en locatie UNIEK zijn.`)
            console.error(e);
        }
        console.log("Resultaat submitdata useState:");
        console.log(patchInfo);
        toggleSubmitSuccess(true);
        console.log("Data na patch success:");
        console.log(data);

        setTimeout(() => {
            // refresh window, show updated post
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.location.reload(true);
        }, 0);
    }
    // einde aanpassen-functie

    // start delete functie
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
                setError(`Dit toilet bestaat niet meer ... je hebt dit toilet succesvol verwijderd! - (${error.message})`);
                console.error(error.message);
            }
        } else {
            console.log("Deleten gecanceled.");
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 0);
        }
    }
    // einde delete functie

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
                                <span className="thumbnail-container">
                                    {/* bestaat-foto-check */}
                                    {toiletEntry && toiletEntry.hasPhoto ?
                                        <img src=
                                                 {`http://localhost:8080/download/img-post-amsterdammuseum.jpg`} alt="thumbnail"
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
                                    {user && <>
                                    <p className="margin-zero">Geen foto te zien?</p>
                                            <form className="margin-zero">
                                                <label htmlFor="photo">Upload hier een
                                                    nieuwe:</label>
                                                <input type="file" id="photo"
                                                       name="photo"/><br/>
                                                <input name="photo" type="submit" value="Uploaden"
                                                       id="photo" className="narrow"/>
                                            </form>
                                    </>}
                                </div>
                                <div className="template-intro toilet">
                                    <h1>{toiletEntry && toiletEntry.title}</h1>
                                    <p><em>datum
                                        geplaatst: {toiletEntry && toiletEntry.postTime}</em></p>
                                    <p><strong>Stad: {toiletEntry && toiletEntry.city}</strong></p>
                                    <p>Land: {toiletEntry && toiletEntry.country}</p>
                                    <p>Beoordeling: {toiletEntry && toiletEntry.ratingAverage} &#9733; &#x2605; &#9733;</p>

                                </div>
                            </div>
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

                        <InputField
                            inputType="text"
                            inputmode="decimal"
                            placeholderText="Geef cijfer van 1 - 10"
                            errors={errors}
                            register={register}
                            labelText="Beoordeling (geef cijfer van 1 - 10)"
                            labelId="averageRating-field"
                            inputName="averageRating"
                            validationRules={{
                                maxLength: {
                                    value: 3,
                                    message: "Te lang, gebruik maximaal 2 tekens (een geheel cijfer van 1 - 10.",

                                },
                            }}
                        />

                        <Slider
                            errors={errors}
                            register={register}
                            labelId="has_photo-check"
                            inputName="hasPhoto"
                            filterAttribute="Met foto"
                            yes="wel"
                            no="zonder"
                        >
                            (later uploaden)
                        </Slider>

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