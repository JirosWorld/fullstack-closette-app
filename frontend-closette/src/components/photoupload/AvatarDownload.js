import React, {useEffect, useState} from 'react';
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";
import {useParams} from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";

function AvatarDownload() {

    // er worden 2 endpoints doorelkaar gebruikt voor de backend:
    //  http://localhost:8080/downloadFromDB <= om echt te downloaden uit de database
    // en http://localhost:8080/download/{bestandsnaam} <= 'fake' prefilled data uit de Uploads directory


    const {id} = useParams();
    const [photoDownloadEntry, setPhotoDownloadEntry] = useState([]);

    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting fase foto-deel
    useEffect(() => {

        async function fetchPhotoDownloads() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/photos`);
                setPhotoDownloadEntry(result.data[result.data.length - 1]);
                console.log("alle photoDownloadEntry data:");
                console.log(result.data);

            } catch (error) {
                setError(`Er is iets misgegaan bij het ophalen van de foto - (${error.message})`);
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchPhotoDownloads();
    }, []);

    // console.log("Alleen nieuwste avatar uit array:");
    // let last_element = photoDownloadEntry[photoDownloadEntry.length - 1];
    // console.log(last_element);
    // console.log("Op 14 na laatste entry uit objecten-array:");
    // console.log(photoDownloadEntry.slice(Math.max(photoDownloadEntry.length - 16, 13)));

    return (
        <span className="thumbnail-container">
            {error && <p className="error-message">{error}</p>}
            {loading && <Loader/>}

            {/* Toon alleen de nieuw geuploade foto's, niet de prefilled data */}

            {photoDownloadEntry && photoDownloadEntry.id < 200
                ?
                <>
                    {/* bestaat-foto-check */}
                    {photoDownloadEntry ?
                        <span className="true-image__visible">
                            <img src={`http://localhost:8080/downloadFromDB/${photoDownloadEntry.fileName}`}
                                             alt="thumbnail"
                                             className="thumbnail-wide"
                                             width="300"/>
                                        <p>Foto ID nummer: {photoDownloadEntry.id}</p>
                                        <p>Naam van foto: {photoDownloadEntry.fileName}</p>
                                    </span>
                        :
                        <>
                    <span className="no-image">
                    <img src={noImage} alt="thumbnail"
                         className="thumbnail-wide transparent" height="300"
                         width="300"/><p>NO IMAGE</p></span>
                        </>
                    }
                </>

                :
                <></>}

</span>
)
    ;
}

export default AvatarDownload;