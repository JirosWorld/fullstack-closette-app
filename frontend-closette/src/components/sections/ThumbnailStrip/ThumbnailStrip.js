import React, {useEffect, useState} from 'react';
import noImage from "../../../assets/img/no-image.png";
import axios from "axios";
import Loader from "../../loader/Loader";
import "./ThumbnailStrip.css";
import {Link} from "react-router-dom";

function ThumbnailStrip() {

    // er worden 2 endpoints doorelkaar gebruikt voor de backend:
    //  http://localhost:8080/downloadFromDB <= om echt te downloaden uit de database
    // en http://localhost:8080/download/{bestandsnaam} <= fake prefilled data uit de Uploads directory

    const [avatarDownloadEntry, setAvatarDownloadEntry] = useState([]);
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
        <>
            {error && <p className="error-message">{error}</p>}
            {loading && <Loader/>}
            <span className="thumbnailstrip thumbnail-container">

            <div className="thumbnailstrip__strip">

            {photoDownloadEntry ?
                <>

                    {photoDownloadEntry.map((thumbpost) => {
                        // console.log("post.data:");
                        // console.log(thumbpost);

                        return <span className="true-image__visible" key={thumbpost.id && thumbpost.fileName}>

                            {thumbpost.id < 200
                            &&
                            <a
                                href={`http://localhost:8080/downloadFromDB/${thumbpost.fileName}`}
                                rel="noreferrer" target="_blank">
                                <img
                                    src={`http://localhost:8080/downloadFromDB/${thumbpost.fileName}`}
                                    alt="thumbnail"
                                    className="thumbnail-wide"
                                    width="100"/>
                            </a>

                            }


                        </span>
                    })}

                </>
                :
                <>
                    <span className="no-image">
                        <img src={noImage} alt="thumbnail"
                             className="thumbnail-wide transparent" height="100"
                             width="100"/>
                    </span>
                </>
            }
            </div>
        </span>
        </>
    );
}

export default ThumbnailStrip;