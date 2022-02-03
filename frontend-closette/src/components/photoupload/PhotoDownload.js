import React, {useEffect, useState} from 'react';
import noImage from "../../assets/img/no-image.png";
import axios from "axios";
import Loader from "../loader/Loader";

function PhotoDownload() {

    // er worden 2 endpoints doorelkaar gebruikt voor de backend:
    //  http://localhost:8080/downloadFromDB <= om echt te downloaden uit de database
    // en http://localhost:8080/download/{bestandsnaam} <= fake prefilled data uit de Uploads directory

    const [photoDownloadEntry, setPhotoDownloadEntry] = useState([]);
    const [mostRecentPhoto, setMostRecentPhoto] = useState({});

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase foto-deel
    useEffect(() => {

        async function fetchPhotoDownloads() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/photos`);
                setPhotoDownloadEntry(result.data);
                setMostRecentPhoto(result.data[result.data.length - 1]);
                console.log("alle foto downloadEntry data:");
                console.log(result.data);
                console.log("de meest recent geuploade foto:");
                console.log(result.data[result.data.length - 1]);

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de foto - (${error.message})`);
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchPhotoDownloads();
    }, []);

    return (
        <span className="thumbnail-container">
            {error && <p className="error-message">{error}</p>}
            {loading && <Loader/>}

            {photoDownloadEntry ?
                <>
                    <span className="true-image__visible">
                        <img
                            src={`http://localhost:8080/downloadFromDB/${mostRecentPhoto.fileName}`}
                            alt="thumbnail"
                            className="thumbnail-wide"
                            width="300"/>
                    </span>
                        {/* default image when there is no uploaded data yet: */}
                        <span className="no-image">
                        <img src={noImage} alt="thumbnail"
                             className="thumbnail-wide transparent" height="300"
                             width="300"/>
                    </span>
                </>
                :
                <>
                    <span className="no-image">
                        <img src={noImage} alt="thumbnail"
                             className="thumbnail-wide transparent" height="300"
                             width="300"/>
                    </span>
                </>
            }

        </span>
    );
}

export default PhotoDownload;