import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import InputField from "../../components/form-elements/inputfield/InputField";
import Loader from "../../components/loader/Loader";
import BackButton from "../../components/buttons/BackButton";

function RegisterPage() {

    const [registerSuccess, toggleRegisterSuccess] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    async function onFormSubmit(data) {
        console.log("Registration data:");
        console.log(data);
        try {
            const result = await axios.post('http://localhost:3000/register', {
                email: data.email,
                password: data.password,
                avatar: "pikachu",
                username: data.username,
            });

            console.log(result);
            toggleRegisterSuccess(true);
            setTimeout( () => {
                history.push("/login");
            }, 5000);

        } catch (e) {
            console.error(e);
        }
    }

    console.log(errors);

    useEffect(() => {
        document.title = "Registreren :: Closette"
    }, []);

    return (
        <section className="register__page">
            <TopNav/>
            <Header
                title="Nieuwe account aanmaken"/>
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
                            // validate: {
                            //     value: (value) => value.includes('@'),
                            //     message: "Email moet een @ bevatten",
                            // },
                        },
                        minLength: {
                            value: 6,
                            message: "Te kort mailadres. Gebruik een apestaartje."
                        }
                    }}
                />

                <InputField
                    inputType="text"
                    errors={errors}
                    register={register}
                    labelText="Gebruikersnaam"
                    labelId="username-field"
                    inputName="username"
                    validationRules={{
                        minLength: {
                            value: 6,
                            message: "Te korte gebruikersnaam, gebruik minstens 6 tekens"
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
                    Registreren
                </button>
                {registerSuccess === true &&
                <div className="confirmation__container">
                    <Loader/>
                    <h3>Registreren gelukt!<br/>Log nu meteen in via de inlogpagina (je wordt
                    automatisch doorgestuurd).</h3>
                </div>}
                <p>Heb je al een account? Ga dan hier <Link to="/login"> naar de inlog pagina</Link>.</p>
            </form>

            <BackButton />
        </section>
    );
}

export default RegisterPage;