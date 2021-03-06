import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loader from "../loader/Loader";
import Avatar from "../../assets/icons/icon-lines-user-jiro.svg";

function AvatarDownload() {

    const [avatarDownloadEntry, setAvatarDownloadEntry] = useState([]);
    const [mostRecentPhoto, setMostRecentPhoto] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting
    useEffect(() => {

        async function fetchAvatarDownloads() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/alluploads`);
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
            <span className="thumbnail__mockup">
            {error && <p className="error-message">{error}</p>}
                {loading && <Loader/>}

                <span className="thumbnail-container">

            {avatarDownloadEntry !== null ?
                <>
                    <span className="true-image__visible">

                        {mostRecentPhoto &&
                        <>
                            <img
                                src={`http://localhost:8080/download/${mostRecentPhoto.fileName}`}
                                alt="thumbnail"
                                className="thumbnail-wide"
                                width="300"/>
                            <p className="tiny-info margin-zero">Foto ID: {mostRecentPhoto.id} |
                                Naam van gebruikersfoto:<br/>{mostRecentPhoto.fileName}</p>
                        </>
                        }

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
                </span>
        </>
    );
}

export default AvatarDownload;