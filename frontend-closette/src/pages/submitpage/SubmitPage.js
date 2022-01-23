import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import Loader from "../../components/loader/Loader";
import "./SubmitPage.css";
import TopNav from "../../components/topnav/TopNav";
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import InputField from "../../components/form-elements/inputfield/InputField";
import Slider from "../../components/form-elements/slider/Slider";
import InputTextarea from "../../components/form-elements/inputfield/InputTextarea";

function SubmitPage() {
    const {user} = useContext(AuthContext);
    // alleen ingelogde users mogen nieuwe entries toevoegen
    console.log(user);

    const [submitInfo, setSubmitInfo] = useState();
    const [submitSuccess, toggleSubmitSuccess] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function onFormSubmitToilet(data) {
        setError('');

        try {
            const result = await axios.post('http://localhost:8080/toilets', {
                title: data.title,
                address: data.address,
                city: data.city,
                country: data.country,
                genderneutral: data.genderneutral,
                infoText: data.infoText,
                latitude: data.latitude,
                longitude: data.longitude,
                openingHours: data.openingHours,
                free: data.free,
                accessible: data.accessible,
                // public: data.public, = toilet wel/niet openbaar
            });
            setSubmitInfo(result);
            console.log("Alle data van 1 submitrequest:");
            console.log(result);

        } catch (e) {
            setError(`(${e.message}) - Wanneer je een 400 error ziet, dan heb je een naam ingevoerd die al bestaat of je hebt een GPS coordinaat gebruikt dat al is ingevoerd - zorg dat titel en locatie UNIEK zijn.`)
            console.error(e);
        }
        console.log("Resultaat submitdata useState:");
        console.log(submitInfo);
        toggleSubmitSuccess(true);

        setTimeout(() => {
            history.push("/search");
        }, 5000);
    }

    console.log(errors);

    useEffect(() => {
        document.title = "Toevoegen nieuwe toilet locatie :: Closette"
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");
    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="Toevoegen / Inzenden"
            />
            <main className="submit__page content-wrapper">
                <h2>Toilet gevonden? Voeg hier een nieuwe toe!</h2>
                <p>Lees meer <Link to="/info/faq-handleiding">in de f.a.q.</Link></p>

                {user ?
                    <>
                        <form className="form-container"
                              onSubmit={handleSubmit(onFormSubmitToilet)}
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
                                        required: {
                                            value: true,
                                            message: "Titel invullen is verplicht. Vul a.u.b. iets in",
                                        },
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
                                        required: {
                                            value: true,
                                            message: "Plaatsnaam invullen is verplicht. Vul a.u.b. iets in",
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "Te korte naam, gebruik minstens 2 tekens.",
                                        },
                                        maxLength: {
                                            value: 85,
                                            message: "Te lange plaatsnaam, gebruik maximaal 85 tekens. Er is slechts 1 stad in de wereld met een plaatsnaam van 85 tekens: Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu, in Nieuw-Zeeland.",

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
                                        required: {
                                            value: true,
                                            message: "Land invullen is verplicht. Vul a.u.b. iets in",
                                        },
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
                                    placeholderText="Typ hier een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, wees zo gedetailleerd als je wilt..."
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

                                <Slider
                                    errors={errors}
                                    register={register}
                                    labelId="has_photo-check"
                                    inputName="has_photo"
                                    filterAttribute="Met foto"
                                    yes="wel"
                                    no="zonder"
                                >
                                    (later uploaden)
                                </Slider>

                                <Slider
                                    errors={errors}
                                    register={register}
                                    labelId="has_rating-check"
                                    inputName="has_rating"
                                    filterAttribute="Met sterren"
                                >
                                    (later beoordelen)
                                </Slider>

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

                            </fieldset>

                            <button
                                type="submit"
                            >
                                Toevoegen/ plaatsen
                            </button>
                            {error && <p className="error-message">{error}</p>}
                            {submitSuccess === true &&
                            <div className="confirmation__container">
                                <Loader/>
                                <h3>Toevoegen gelukt!</h3>
                                    <h2>Zoek je nieuwe toilet nu meteen op in de
                                    database (je wordt automatisch doorgestuurd).</h2>
                            </div>}

                        </form>

                    </>
                    :
                    <>
                        <h3>~ Je bent niet ingelogd ~</h3>
                        <h4>
                            <Link to="/signup">Maak eerst
                                een account</Link> om te kunnen reageren
                            of <Link to="/login"> log in</Link>.</h4>
                    </>}
            </main>
            <BackButton/>
        </>
    );
}

export default SubmitPage;
