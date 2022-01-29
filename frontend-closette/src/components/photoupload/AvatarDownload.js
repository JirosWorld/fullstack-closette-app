import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loader from "../loader/Loader";
import Avatar from "../../assets/icons/icon-lines-user-jiro.svg";

function AvatarDownload() {

    // er worden 2 endpoints doorelkaar gebruikt voor de backend:
    //  http://localhost:8080/downloadFromDB <= om echt te downloaden uit de database
    // en http://localhost:8080/download/{bestandsnaam} <= 'fake' prefilled data uit de Uploads directory

    const [avatarDownloadEntry, setAvatarDownloadEntry] = useState([]);
    const [mostRecentPhoto, setMostRecentPhoto] = useState({});

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase foto-deel
    useEffect(() => {

        async function fetchAvatarDownloads() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/photos`);
                setAvatarDownloadEntry(result.data);
                setMostRecentPhoto(result.data[result.data.length - 1]);
                console.log("alle avatar downloadEntry data:");
                console.log(result.data);
                console.log("de meest recent geuploade avatar:");
                console.log(result.data[result.data.length - 1]);

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de gebruikersafbeelding - (${error.message})`);
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchAvatarDownloads();
    }, []);

    return (
    <>
        {error && <p className="error-message">{error}</p>}
        {loading && <Loader/>}

        <span className="thumbnail-container">

            {avatarDownloadEntry !== null ?
                <>
                    <span className="true-image__visible">
                        <img
                            src={`http://localhost:8080/downloadFromDB/${mostRecentPhoto.fileName}`}
                            alt="thumbnail"
                            className="thumbnail-wide"
                            width="300"/>
                        <p className="tiny-info">Foto ID: {mostRecentPhoto.id} |
                                Naam van gebruikersfoto:<br/>{mostRecentPhoto.fileName}</p>
                    </span>
                    {/* default image when there is no uploaded data yet: */}
                    <span className="no-image">
                    <img src={Avatar} alt="thumbnail"
                         className="thumbnail-wide transparent" height="300"
                         width="300"/>
                    </span>
                </>
                :
                <>
                    <span className="no-image">
                        <img src={Avatar} alt="thumbnail"
                             className="thumbnail-wide transparent" height="300"
                             width="300"/>
                    </span>
                </>
            }

    </span>

    </>
    );
}

export default AvatarDownload;