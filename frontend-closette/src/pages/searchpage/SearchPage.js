import React, {useEffect, useState} from 'react';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import "./SearchPage.css"
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import TopNav from "../../components/topnav/TopNav";
import {NavLink} from "react-router-dom";

function SearchPage() {

    const [toiletEntry, setToiletEntry] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    // Webtoken: verander dit getal wanneer deze verlopen is
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MjI1MjEzMCwiaWF0IjoxNjQxMzg4MTMwfQ.yauYw0EQTXpV4Nq0U5qf5gwxpPbVrefKAsaTqHQ-Cuo";

    const decoded = jwt_decode(token);

    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MjI1MjEzMCwiaWF0IjoxNjQxMzg4MTMwfQ.yauYw0EQTXpV4Nq0U5qf5gwxpPbVrefKAsaTqHQ-Cuo');

    //mounting fase
    useEffect(() => {
        console.log("komt u hier?");
        document.title = "Zoeken :: Closette"
        //de functie om data op te halen
        async function fetchToilets() {
            //zet de error steeds op leeg, iedere keer bij laden van data
            setError('');
            //zet de loader animatie aan zolang data wordt geladen
            toggleLoading(true);
            console.log("komt u hier 2?");
            try {
                // await request:
                console.log("komt u hier 3?");
                const result = await axios.get('http://localhost:8080/toilets', {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MjI1MjEzMCwiaWF0IjoxNjQxMzg4MTMwfQ.yauYw0EQTXpV4Nq0U5qf5gwxpPbVrefKAsaTqHQ-Cuo"
                });
                // toon alle entries
                setToiletEntry(result);
                console.log("alle result inhoud:");
                console.log(result);
                console.log("alle result.data:");
                console.log(result.data);
                console.log("de 4e result.data:");
                console.log(result.data[3]);
                console.log("de eigenaar van de 4e entry:");
                console.log(result.data[3].owner.name);
            } catch (error) {
                console.log("komt u hier 4?");
                setError("Er is iets misgegaan bij het ophalen van de data");
                console.error(error);
            }
            toggleLoading(false);
        }

        fetchToilets();

    }, []);

    return (
        <div className="searchpage">
            <TopNav/>
            <Button/>
            <Header
                title="Zoeken"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="posts">
                    <h5>id: {toiletEntry.data && toiletEntry.data[0].id}</h5>
                    <ul>
                        <li>title: {toiletEntry.data && toiletEntry.data[0].title}</li>
                        <li>author: {toiletEntry.data && toiletEntry.data[0].author}</li>
                        <li>stad: {toiletEntry.data && toiletEntry.data[0].city}</li>
                        <li>land: {toiletEntry.data && toiletEntry.data[0].country}</li>
                        <li>genderneutraal?: {toiletEntry.data && toiletEntry.data[0].genderneutral}</li>
                        <li>openingstijden: {toiletEntry.data && toiletEntry.data[0].openingHours}</li>
                        <li>informatie: {toiletEntry.data && toiletEntry.data[0].infoText}</li>
                        <li>breedtegraad: {toiletEntry.data && toiletEntry.data[0].latitude}</li>
                        <li>breedtegraad: {toiletEntry.data && toiletEntry.data[0].latitude}</li>
                        <li>lengtegraad: {toiletEntry.data && toiletEntry.data[0].longitude}</li>
                        <li>Link naar kaart! <a href={toiletEntry.data && `https://www.openstreetmap.org/?mlat=${toiletEntry.data[0].latitude}&mlon=${toiletEntry.data[0].longitude}&zoom=12`}  rel="noreferrer" target="_blank">MAP</a></li>
                        <li>owner id: {toiletEntry.data && toiletEntry.data[0].owner.id}</li>
                        <li>geplaatst door user: {toiletEntry.data && toiletEntry.data[0].owner.name}</li>
                    </ul>

                <ul className="mapped__posts">
                    {loading && <Loader/>}
                    {toiletEntry.data &&  toiletEntry.data.map((post) => {
                            console.log("post.data:");
                            console.log(post);
                        return <li key={post.title}>
                            <div className="content-wrapper">
                                <h2 className="mapped__post__title">
                                    <span>{Object.keys(post.title).length > 0 && post.title}</span>
                                </h2>
                                |<span className="mapped__post__author">by: {post.author}</span>|
                                <br/>
                                | <span className="mapped__post__subreddit">
                                internal link to:
                                <NavLink
                                activeClassName="active-link"
                                to={"/" + post.id}> &#x23E9; "{post.city}"
                                </NavLink></span>|
                                <br/>
                                |<span className="mapped__post__votes">Vote: {post.latitude}</span>.
                            </div>
                            {/* <!-- end content wrapper --> */}
                        </li>

                    }
                    )}
                </ul>

            </div>
            <Button/>
        </div>
    );
}

export default SearchPage;
