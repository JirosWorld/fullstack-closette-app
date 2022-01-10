import React, {useEffect, useState, useContext} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import axios from "axios";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import "./LoginPage.css";
import InputField from "../../components/form-elements/inputfield/InputField";
import Loader from "../../components/loader/Loader";
import {AuthContext} from "../../context/AuthContext";
import BackButton from "../../components/buttons/BackButton";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loginSuccess, toggleLoginSuccess] = useState(false);

    async function onFormSubmit(data) {
        console.log("Login data (secret):");
        console.log(data);
        try {
            const result = await axios.post('http://localhost:3000/login', data);
            // let op: ander endpoint
            // je hoeft geen array/JSON uit te typen omdat de inputveld dezelfde namen heeft als de database

            console.log("Result data:");
            console.log(result);
            // console.log("Result JWT token:");
            // console.log(result.data.accessToken);
            login(result.data.accessToken);

            toggleLoginSuccess(true);


        } catch (e) {
            console.error(e);
        }
    }

    console.log(errors);

    useEffect(() => {
        document.title = "Inloggen :: Closette"
    }, []);

    return (
        <section className="login__page">
            <TopNav/>
            <Header
                title="Inloggen"/>

            {loginSuccess === true &&
            <div className="confirmation__container">
                <Loader/>
                <h3>Inloggen gelukt!<br/>Je wordt nu automatisch doorgestuurd naar de home pagina.</h3>
            </div>}

            <form className="form-container" onSubmit={handleSubmit(onFormSubmit)}>
                <InputField
                    errors={errors}
                    register={register}
                    labelText="E-mail"
                    labelId="email-field"
                    inputName="email"
                    validationRules={{
                        required: {
                            value: true,
                            message: "Email invullen is verplicht. Vul aub iets in",
                            // validate: {
                            //     value: (value) => value.includes('@'),
                            //     message: "Email moet een @ bevatten",
                            // },
                        },
                        minLength: {
                            value: 6,
                            message: "Te kort mailadres."
                        }
                    }}
                />

                <InputField
                    errors={errors}
                    register={register}
                    labelText="Wachtwoord"
                    labelId="password-field"
                    inputName="password"
                    validationRules={{
                        minLength: {
                            value: 10,
                            message: "Te kort wachtwoord, gebruik minstens 10 tekens"
                        }
                    }}
                />

                <button type="submit">
                    Inloggen
                </button>
                <p>Heb je nog geen account? Maak er dan <Link to="/signup"> hier eentje aan</Link>.</p>
            </form>
            <BackButton />
        </section>
    );
}

export default LoginPage;