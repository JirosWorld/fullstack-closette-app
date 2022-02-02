import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import Upload from "./Upload";
import Loader from "../loader/Loader";
import Accordeon from "../accordeon/Accordeon";

function AvatarUpload() {

    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('closetteToken');
    // alleen ingelogde users mogen bewerken
    console.log(user);

    // mijn API endpoints
    // POST	http://localhost:8080/single/uploadDb = upload naar DB
    // POST	http://localhost:8080/single/upload = upload zónder database
    // GET	http://localhost:8080/photos = get List
    // GET	http://localhost:8080/photos/[filename] = download 1 File

    useEffect(() => {
        setFile();
        setUrl();
    }, []);

    const [file, setFile] = useState({});
    const [url, setUrl] = useState({});
    const [submitInfo, setSubmitInfo] = useState({});
    const [submitSuccess, toggleSubmitSuccess] = useState(false);
    const [error, setError] = useState('');
    const {handleSubmit} = useForm();

    console.log("in file en url zitten nu:",file, url);

    async function uploadAvatar() {

        setError('');
        let formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.post("http://localhost:8080/single/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                    file: formData
                })
            if (result) {
                // const json = await response.json();
                // console.warn("json", json);
                console.warn("response gegeven:", result);
                console.log({ uploadPhoto: uploadAvatar });
            }
            setSubmitInfo(result);

        } catch (error) {
            setError(`(${error.message}) - Er ging iets mis bij het uploaden van de avatar.`)
            console.error(error);
        }
        toggleSubmitSuccess(true);
        console.log("Result na submit?:");
        console.log(submitInfo);

        setTimeout(() => {
            window.scrollTo({top: 0, behavior: 'smooth'});
            window.location.reload(true);
        }, 2000);
    }

    return (
        <>
            {error && <p className="error-message">{error}</p>}

            <div className="margin-zero">
                <Accordeon title="Geen mooie avatar?">
                    <p className="margin-zero">Geen mooie avatar?</p>
                    <div className="margin-zero">
                        <label htmlFor="photo">Upload hier een
                            nieuwe, liefst vierkante, gebruikersafbeelding (scroll naar beneden):</label>
                        <br/>

                        <form onSubmit={handleSubmit(uploadAvatar)} className="margin-zero">

                            <Upload file={file}
                                    setFile={setFile}
                                    url={url}
                                    setUrl={setUrl} />

                            <button type="submit" className="narrow margin-zero">
                                Uploaden
                            </button>
                            {submitSuccess === true &&
                            <div className="confirmation__container margin-zero">
                                <h3><Loader/> Aanpassen avatar gelukt!</h3>
                                <p>De pagina herlaadt nu opnieuw.</p>
                            </div>}
                            {error && <p className="error-message">{error}</p>}

                        </form>

                    </div>
                </Accordeon>
            </div>
        </>
    );
}

export default AvatarUpload;