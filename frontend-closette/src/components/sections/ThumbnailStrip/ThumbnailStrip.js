import React, {useEffect, useState} from 'react';
import noImage from "../../../assets/img/no-image.png";
import axios from "axios";
import Loader from "../../loader/Loader";
import "./ThumbnailStrip.css";

function ThumbnailStrip() {

    const [photoDownloadEntry, setPhotoDownloadEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    //mounting
    useEffect(() => {

        async function fetchPhotoDownloads() {

            setError('');
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8080/photos`);
                setPhotoDownloadEntry(result.data);
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