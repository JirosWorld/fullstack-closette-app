import React, {useEffect, useState} from 'react';
import noImage from "../../assets/icons/icon-lines-toilet-jiro.svg";
import {useParams} from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";

function PhotoDownload() {

    // er worden 2 endpoints doorelkaar gebruikt voor de backend:
    //  http://localhost:8080/downloadFromDB <= om echt te downloaden uit de database
    // en http://localhost:8080/download/{bestandsnaam} <= fake prefilled data uit de Uploads directory
    //
    // The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array
    // const film = this.props.data.slice(0, 13).map((item) => {
    //         return <FilmItem key={item.id} film={item} />
    //     });
    //
    // return film;

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
                setPhotoDownloadEntry(result.data);
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

    return (
        <span className="thumbnail-container">
            {error && <p className="error-message">{error}</p>}
            {loading && <Loader/>}
            Doet dit iets?
            {photoDownloadEntry && photoDownloadEntry.map((post) => {
                    // console.log("Gemapte foto post.data:");
                    // console.log(post);


                    return <div key={post.id && post.fileName}>
                        {/* Toon alleen de nieuw geuploade foto's, niet de prefilled data */}
                        {photoDownloadEntry && post.id < 200
                            ?
                            <>
                                {/* bestaat-foto-check */}
                                {photoDownloadEntry ?
                                    <span className="true-image__visible">
                                        <img src=
                                                 {`http://localhost:8080/downloadFromDB/${post.fileName}`}
                                             alt="thumbnail"
                                             className="thumbnail-wide"
                                             width="300"/>
                                        <p>Foto ID nummer: {post.id}</p>
                                        <p>Hoort bij toilet: {post.id}</p>
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

                    </div>

                }
            )}
        </span>
    );
}

export default PhotoDownload;