import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import {useForm} from 'react-hook-form';
import EmailSent from "../../assets/icons/icon-email-sent.png";

import "./ContactPage.css";
//
// Dit contactformulier werkt via mijn EmailJS mailserver-cloud-account, niet via de back-end
//
import {init} from '@emailjs/browser';
import {Link} from "react-router-dom";
import InputField from "../../components/form-elements/inputfield/InputField";
import InputTextarea from "../../components/form-elements/inputfield/InputTextarea";
import Slider from "../../components/form-elements/slider/Slider";

init("user_QXd8UjBeN4IPK6AdPaueU");


export const ContactUs = () => {
    const form = useRef();
    const {register, handleSubmit, formState: {errors}} = useForm({ mode: 'onChange' });
    const [submitSuccess, toggleSubmitSuccess] = useState(false);


    function onFormSubmit(data, event) {
        console.log(data);
        toggleSubmitSuccess(true);
        event.preventDefault();

        emailjs.sendForm('service_ssb9iza', 'template_nvqg5vg', form.current, 'user_QXd8UjBeN4IPK6AdPaueU')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <>
            <form ref={form} className="form-container" onSubmit={handleSubmit(onFormSubmit)}>
                <InputField
                    inputType="text"
                    errors={errors}
                    register={register}
                    labelText="Naam afzender"
                    labelId="from_name-field"
                    inputName="from_name"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Je naam invullen is verplicht. Vul a.u.b. iets in",
                        },
                        minLength: {
                            value: 1,
                            message: "Te korte naam.",
                        },
                    }}
                />

                <InputField
                    inputType="email"
                    errors={errors}
                    register={register}
                    labelText="E-mail"
                    labelId="user_email-field"
                    inputName="user_email"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Je e-mail invullen is verplicht. Vul a.u.b. iets in",
                        },
                        minLength: {
                            value: 1,
                            message: "Te kort adres.",
                        },
                    }}
                />

                <InputTextarea
                    rowNr={6}
                    columnNr={30}
                    errors={errors}
                    register={register}
                    labelText="Bericht"
                    labelId="message-field"
                    inputName="message"
                    placeholderText="Type hier je bericht..."
                    validationRules={{
                        required: {
                            value: true,
                            message: "Vul a.u.b. iets in",
                        },
                    }}
                />

                <Slider
                    errors={errors}
                    register={register}
                    labelId="privacy-check"
                    inputName="privacy"
                    filterAttribute="Akkoord met privacy"
                    yes="ja"
                    no="nee"
                >
                    Link <Link to="/info/faq-handleiding">naar privacy pagina</Link>
                </Slider>

                <input type="submit" value="Verstuur"/>

            </form>
            {submitSuccess === true &&
            <div className="confirmation__container">
                <img src={EmailSent}
                     alt="email sent icon"
                     width="100"/>
                <h3>Versturen gelukt!</h3>
                <p>Als je een geldig mailadres hebt ingevuld, ontvang je nu automatisch een &eacute;chte e-mail met bevestiging.</p>
            </div>}

        </>
    );
};