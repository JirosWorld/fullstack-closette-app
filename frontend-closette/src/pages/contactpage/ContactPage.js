import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import "./ContactPage.css"
import Header from "../../components/header/Header";
import TopNav from "../../components/topnav/TopNav";
import InputField from "../../components/form-elements/inputfield/InputField";
import Slider from "../../components/form-elements/slider/Slider";

function ContactPage() {
    // we declareren het formulier altijd op de pagina, niet in de InputComponenten
    const {register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        document.title = "Contact :: Closette"
    }, []);

    function onFormSubmit(data) {
        console.log("Contact data:");
        console.log(data);
    }

    console.log(errors);

    return (
        <section className="contact__page">
            <TopNav/>
            <Header
                title="Contactpagina"/>
            <form className="form-container" onSubmit={handleSubmit(onFormSubmit)}>
                <InputField
                    errors={errors}
                    register={register}
                    labelText="Voornaam"
                    labelId="firstname-field"
                    inputName="firstname"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Voornaam invullen is verplicht. Vul aub iets in",
                        },
                        minLength: {
                            value: 6,
                            message: "Je moet nu iets anders invullen"
                        }
                    }}
                />

                <InputField
                    errors={errors}
                    register={register}
                    labelText="Achternaam"
                    labelId="lastname-field"
                    inputName="lastname"
                    validationRules={{
                        maxLength: {
                            value: 10,
                            message: "TE LANG!!!!"
                        }
                    }}
                />
                <Slider />

                <button type="submit">
                    Verzenden
                </button>
            </form>
        </section>
    );
}

export default ContactPage;