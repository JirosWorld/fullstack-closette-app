import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import Upload from "./Upload";
import Loader from "../loader/Loader";
import Accordeon from "../accordeon/Accordeon";

function PhotoUpload() {

    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('closetteToken');
    console.log(user);


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

    console.log("in file en url zitten nu:", file, url);

    async function uploadPhoto() {

        setError('');
        let formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.post("http://localhost:8080/single/uploadDb",
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
                console.log({uploadPhoto});
            }
            setSubmitInfo(result);

        } catch (error) {
            setError(`(${error.message}) - Er ging iets mis bij het uploaden van de foto.`)
            console.error(error);
        }
        toggleSubmitSuccess(true);
        console.log("Result na submit?:");
        console.log(submitInfo);

        setTimeout(() => {
            window.location.reload(true);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }, 2000);
    }

    return (
        <>
            {error && <p className="error-message">{error}</p>}


            <div className="margin-zero">
                <Accordeon title="Upload nieuwe foto">
                    <p className="margin-zero">Heb je een betere foto?</p>
                    <div className="margin-zero">
                        <label htmlFor="photo">Upload hier een
                            nieuwe, liefst vierkante, foto (scroll naar beneden):</label>
                        <br/>

                        <form onSubmit={handleSubmit(uploadPhoto)}>

                            <Upload file={file}
                                    setFile={setFile}
                                    url={url}
                                    setUrl={setUrl}/>

                            <button type="submit" className="narrow">
                                Uploaden
                            </button>
                            {submitSuccess === true &&
                            <div className="confirmation__container">
                                <h3><Loader/> Aanpassen gelukt!</h3>
                                <h2>Deze pagina herlaadt nu opnieuw.</h2>
                            </div>}
                            {error && <p className="error-message">{error}</p>}

                        </form>
                    </div>

                </Accordeon>
            </div>


        </>
    );
}

export default PhotoUpload;