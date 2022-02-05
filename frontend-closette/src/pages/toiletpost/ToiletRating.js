import React, {useContext, useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import "./ToiletPost.css";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import InputField from "../../components/form-elements/inputfield/InputField";
import {useForm} from "react-hook-form";


function ToiletRating() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('closetteToken');
    // console.log("Dit is de user die een rating mag geven:",user);
    const {id} = useParams();
    const [toiletEntry, setToiletEntry] = useState({});

    // beoordeling berekenen
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    // stem formulier moet alleen zichtbaar zijn wanneer daarom gevraagd wordt
    const [visibilityRating, setVisibilityRating] = useState(true);

    const [loading, toggleLoading] = useState(false);
    const [submitSuccess, toggleSubmitSuccess] = useState(false);
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
         });

    // TODO: set min/max of numberfield, not working
    // const [value, setValue] = useState(0);
    //
    // function handleNumberChange(event) {
    //     let { value: numberValue, min, max } = event.target;
    //     numberValue = Math.max(Number(min), Math.min(Number(max), Number(numberValue)));
    //
    //     setValue(numberValue);
    // }

    //mounting fase
    useEffect(() => {

        async function fetchToiletRatings() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/toilets/${id}`);
                setToiletEntry(result.data);
                setVisibilityRating(true);

                let sum = 0;
                const itemsFound = result.data.ratings.length;
                for (let i = 0; i < itemsFound; i++) {
                    sum += parseInt(result.data.ratings[i].rating);
                }
                console.log("nr popularitySum:", sum);

                function naiveRound(num, decimalPlaces = 0) {
                    var p = Math.pow(10, decimalPlaces);
                    return Math.round(num * p) / p;
                }

                console.log(naiveRound((sum / itemsFound), 2));
                const averagePopularity = naiveRound((sum / itemsFound), 2);

                setNumberOfRatings(itemsFound);
                console.log("nr itemsFound:", itemsFound);
                setAverageRating(averagePopularity);
                console.log("Average popularity:", averagePopularity);

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de data, of... je hebt dit toilet succesvol verwijderd! - (${error.message})`);
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchToiletRatings();

    }, []);


    // start rating-functie

    async function onFormSubmitPostRating(data) {
        setError('');


        // pass nested data to OneToMany endpoint

        try {
            const result = await axios.post(`http://localhost:8080/toilets/${id}/ratings`,
                {
                    rating: data.rating,
                    "toilet": {
                        "id": id
                    },
                    "user": {
                        "username": user.username
                    }
                });
            toggleSubmitSuccess(true);
            console.log("Data na post success:");
            console.log(data);


            setTimeout(() => {
                // refresh window, show updated toiletpost
                window.location.reload(true);
                window.scrollTo({top: 0, behavior: 'smooth'});
            }, 0);

        } catch (e) {
            setError(`(${e.message}) - Voer alleen gehele getallen van 1 - 10 in.`)
            console.error(e);
        }
    }

    // einde aanpassen-functie

    return (
        <>

                <div className={visibilityRating ? "show" : "hidden"}>
                    <section className="ratings-section">

                            {error && <p className="error-message">{error}</p>}
                            {loading && <Loader/>}
                            <div className="template-intro__rating">

                                <p>Gemiddelde beoordeling:
                                    {averageRating ||
                                    <span className="tiny-info"> &nbsp; &#10060; 0 stemmen</span>}
                                    {averageRating < 7
                                    && <span> &#9733; &#x2605; </span>}

                                    {averageRating > 7
                                    && <span> &#9733; &#x2605; &#9733; &#x2605; &#9733;</span>}
                                </p>
                                <p className="tiny-info">(gebaseerd op <em>{numberOfRatings}</em> ratings)</p>

                            </div>


                        {user && <>
                            <div className="vote-wrapper">
                                <p>
                                    <button type="button" className="add vote-button"
                                            onClick={() => setVisibilityRating(false)}>Stem!
                                    </button>
                                </p>

                            </div>
                        </>}
                    </section>
                </div>
                {/*    end of section that will be hidden when posting */}

            {/* start of section that will be shown when 'Stem' button is clicked */}
            {user &&
            <div className={visibilityRating ? "hidden" : "show"}>
                <div className="toilet-rating">
                    <h2>Review</h2>
                    <p>Geef een nieuwe waardering!</p>
                </div>
                <form className="form-container vote-form"
                      onSubmit={handleSubmit(onFormSubmitPostRating)}
                >
                    <fieldset className="checkbox-filters narrow">

                        <InputField
                            inputType="number"
                            errors={errors}
                            register={register}
                            labelText="Geef cijfer tussen 1 en 10)"
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
                        type="submit" className="remove vote-button"
                    >
                        Verzend
                    </button>
                    {/* on button click: post new rating */}

                    {error && <p className="error-message">{error}</p>}
                    {submitSuccess === true &&
                    <div className="confirmation__container">
                        <Loader/>
                        <h3>Toevoegen rating gelukt!</h3>
                        <p>Deze pagina herlaadt nu opnieuw.</p>
                    </div>}

                </form>
                <button
                    className="cancel vote-button"
                    onClick={() => window.location.reload(true)}
                >
                    Cancel
                </button>

            </div>
            }
        </>
    );
}

export default ToiletRating;