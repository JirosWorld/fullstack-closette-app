import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import loadData from "../../helpers/loadData";
import "./LoginPage.css";
import InputField from "../../components/form-elements/inputfield/InputField";

function LoginPage() {

    const {register, handleSubmit, formState: {errors}} = useForm();

    function onFormSubmit(data) {
        console.log("Login data (secret):");
        console.log(data);
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
                    Registreren
                </button>
            </form>



            <h2>AJAX post:</h2>
            <p>
                <label>URL</label>
                <input type="text" id="url" name="url" defaultValue="http://localhost:8080/toilets" /><br />
                    <label>Http Basic Authentication:</label>
                    <input type="text" id="username" name="username" defaultValue="admin" />
                        <input type="text" id="password" name="password" defaultValue="password" /><br />
                            <input type="button" value="Get data"
                                   onClick={loadData("http://localhost:8080/toilets", "admin", "password")} />
            </p>
            <p>
                <label>Status Code</label>
                <pre id="status"></pre>
            </p>
            <p>
                <label>Body</label>
                <span id="data"></span>
            </p>
        </section>
    );
}

export default LoginPage;