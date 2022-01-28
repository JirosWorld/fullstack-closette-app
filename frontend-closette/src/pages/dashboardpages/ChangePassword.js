import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from 'react-hook-form';
import {useParams} from "react-router-dom";
import axios from "axios";
import InputField from "../../components/form-elements/inputfield/InputField";
import Loader from "../../components/loader/Loader";
import "./ChangePassword.css"

function ChangePassword() {

    const [changeSuccess, toggleChangeSuccess] = useState(false);
    const [error, setError] = useState('');
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('closetteToken');
    const {register, handleSubmit, formState: {errors}} = useForm({ mode: 'onBlur' });

    async function onFormSubmit(data) {
        setError('');
        console.log("Gebruikersnaam data:");
        console.log(data, user.username);

        try {
            const result = await axios.patch(`http://localhost:8080/users/${user.username}/password`,
                {
                      password: data.password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log("Resultaat data:");
            console.log(result);
            toggleChangeSuccess(true);
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);

        } catch (e) {
            console.error(e);
            setError(`Het aanpassen is mislukt. Probeer het opnieuw - (${e.message})`);
        }
    }

    console.log(errors);

    return (
        <>
            <main className="dashboard__modal content-wrapper">

                <form className="form-container" onSubmit={handleSubmit(onFormSubmit)}>

                    <p>Typ hier een nieuw wachtwoord, let op: <br/>
                        wachtwoorden dienen tenminste 4 tekens lang te zijn en tenminste
                        1 cijfer en 1 gewone letter te bevatten. Hoofdletters zijn niet verplicht.</p>

                    <InputField
                        inputType="password"
                        errors={errors}
                        register={register}
                        placeholderText="... "
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
                    <button type="submit">
                        Verander
                    </button>
                    {error && <p className="error-message">{error}</p>}
                    {changeSuccess === true &&
                    <div className="confirmation__container">
                        <Loader/>
                        <h3>Veranderen gelukt!</h3>
                        <p>De pagina herlaadt nu vanzef opnieuw.</p>
                    </div>}
                </form>
            </main>
        </>
    );
}

export default ChangePassword;