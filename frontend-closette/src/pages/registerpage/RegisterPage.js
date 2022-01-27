import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import InputField from "../../components/form-elements/inputfield/InputField";
import Loader from "../../components/loader/Loader";
import BackButton from "../../components/buttons/BackButton";

function RegisterPage() {

    const [registerSuccess, toggleRegisterSuccess] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm({ mode: 'onBlur' });

    async function onFormSubmit(data) {
        setError('');
        console.log("Registration data:");
        console.log(data);
        try {
            const result = await axios.post('http://localhost:8080/users/register', {
                email: data.email,
                password: data.password,
                username: data.username,
            });

            console.log("Resultaat data:");
            console.log(result);
            toggleRegisterSuccess(true);

            setTimeout(() => {
                history.push("/login");
            }, 5000);

        } catch (e) {
            console.error(e);
            setError(`Het registeren is mislukt. Probeer het opnieuw (${e.message})`);
        }
    }

    console.log(errors);

    useEffect(() => {
        document.title = "Registreren :: Closette"
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");
    }, []);

    return (
        <>
            <TopNav/>
            <Header
                title="Nieuwe account aanmaken"/>
            <main className="register__page content-wrapper">
                <form className="form-container" onSubmit={handleSubmit(onFormSubmit)}>
                    <InputField
                        inputType="email"
                        errors={errors}
                        register={register}
                        labelText="E-mail"
                        labelId="email-field"
                        inputName="email"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Email invullen is verplicht. Vul aub iets in",
                            },
                            minLength: {
                                value: 6,
                                message: "Te kort mailadres. Gebruik een apestaartje.",
                            },
                        }}
                    />

                    <InputField
                        inputType="text"
                        errors={errors}
                        register={register}
                        placeholderText="... typ minstens 4 tekens"
                        labelText="Gebruikersnaam"
                        labelId="username-field"
                        inputName="username"
                        validationRules={{
                            minLength: {
                                value: 4,
                                message: "Te korte gebruikersnaam, gebruik minstens 4 tekens.",
                            },
                            maxLength: {
                                value: 15,
                                message: "Te lange gebruikersnaam, gebruik maximaal 15 tekens.",
                            },
                        }}
                    />

                    <InputField
                        inputType="password"
                        errors={errors}
                        register={register}
                        placeholderText="... met tenminste 1 cijfer en 1 gewone letter"
                        labelText="Wachtwoord"
                        labelId="password-field"
                        inputName="password"
                        validationRules={{
                            minLength: {
                                value: 4,
                                message: "Te kort wachtwoord, gebruik minstens 4 tekens, met tenminste 1 cijfer en 1 gewone letter."
                            }
                        }}
                    />
                    <p>Link <Link to="/info/faq-handleiding">naar privacy pagina</Link>.</p>
                    <button type="submit">
                        Registreren
                    </button>
                    {error && <p className="error-message">{error}</p>}
                    {registerSuccess === true &&
                    <div className="confirmation__container">
                        <Loader/>
                        <h3>Registreren gelukt!<br/>Log nu meteen in via de inlogpagina (je wordt
                            automatisch doorgestuurd).</h3>
                    </div>}
                    <p>Heb je al een account? Ga dan hier <Link to="/login"> naar de inlog
                        pagina</Link>.</p>
                </form>
            </main>
            <BackButton/>
        </>
    );
}

export default RegisterPage;