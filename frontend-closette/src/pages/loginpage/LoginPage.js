import React, {useEffect, useState, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";
import axios from "axios";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import "./LoginPage.css";
import InputField from "../../components/form-elements/inputfield/InputField";
import Loader from "../../components/loader/Loader";
import {AuthContext} from "../../context/AuthContext";
import BackButton from "../../components/buttons/BackButton";

function LoginPage() {
    const {login} = useContext(AuthContext);
    const [error, setError] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm({ mode: 'onChange' });
    const [loginSuccess, toggleLoginSuccess] = useState(false);

    useEffect(() => {
        document.title = "Inloggen :: Closette"
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");
    }, []);

    async function onFormSubmit(data) {
        setError('');
        console.log("Login data (secret):");
        console.log(data);
        try {
            const result = await axios.post('http://localhost:8080/authenticate', data);

            console.log("Result data:");
            console.log(result);
            // console.log("Result JWT token:");
            // console.log(result.data.accessToken);
            login(result.data.jwt);

            toggleLoginSuccess(true);


        } catch (e) {
            console.error(e);
            setError(`Het inloggen is mislukt. Vul de juiste gegevens in - (${e.message})`);
        }
    }

    console.log(errors);

    return (
        <>
            <TopNav/>
            <Header
                title="Inloggen"/>
            <main className="login__page content-wrapper">
                <p>Alleen ingelogde gebruikers kunnen foto's uploaden en nieuwe toiletten toevoegen. Log daarom hier in!</p>
                {loginSuccess === true &&
                <div className="confirmation__container">
                    <Loader/>
                    <h3>Inloggen gelukt!<br/>Je wordt nu binnen 3 seconden automatisch doorgestuurd
                        naar de home pagina.</h3>
                </div>}

                <form className="form-container" onSubmit={handleSubmit(onFormSubmit)}>
                    <InputField
                        errors={errors}
                        register={register}
                        labelText="Gebruikersnaam"
                        labelId="username-field"
                        inputName="username"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Gebruikersnaam invullen is verplicht. Vul aub iets in"
                            },
                            minLength: {
                                value: 3,
                                message: "Te korte gebruikersnaam."
                            }
                        }}
                    />

                    <InputField
                        inputType="password"
                        errors={errors}
                        register={register}
                        labelText="Wachtwoord"
                        labelId="password-field"
                        inputName="password"
                        validationRules={{
                            minLength: {
                                value: 4,
                                message: "Te kort wachtwoord, gebruik minstens 4 tekens"
                            }
                        }}
                    />

                    <button type="submit">
                        Inloggen
                    </button>
                    {error && <p className="error-message">{error}</p>}
                    <p>Heb je nog geen account? Maak er dan <Link to="/signup"> hier eentje
                        aan</Link>.</p>
                </form>
            </main>
            <BackButton/>
        </>
    );
}

export default LoginPage;