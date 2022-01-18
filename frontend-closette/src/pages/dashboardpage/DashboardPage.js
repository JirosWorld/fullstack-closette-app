import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import {Link, Route} from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Avatar from "../../assets/icons/icon-lines-user-jiro.svg";
import SearchSCHETS from "../searchpage/SearchSCHETS";
import ToiletPhotoSCHETS from "../toiletpost/ToiletPhotoSCHETS";
import ToiletPatchSCHETS from "../toiletpost/ToiletPatchSCHETS";

function DashboardPage() {

    useEffect(() => {
        document.title = "Mijn dashboard :: Closette"
    }, []);

    const [privateContent, setPrivateContent] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const {user} = useContext(AuthContext);
    console.log(user);

    useEffect(() => {
        const token = localStorage.getItem('closetteToken');

        if (user.username === "admin") {
            // checken of admin is ingelogd, laat dan pas de Userlijst in Dashboard zien
            async function getPrivateContent() {
                setError('');
                toggleLoading(true);

                try {
                    const result = await axios.get('http://localhost:8080/users', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setPrivateContent(result);
                } catch (e) {
                    setError(`De data wordt niet geladen. (${e.message})`);
                    console.error(e);
                }
                toggleLoading(false);
            }

            getPrivateContent();
        } else {
            console.log("Gewone user is ingelogd");
        }

    }, []);

    return (

        <>
            <TopNav/>
            <Header
                title="Mijn Dashboard"/>
            <main className="newspost__page content-wrapper">
                <section className="template">
                    <article>
                        {error && <p className="error-message">{error}</p>}
                        {loading && <Loader/>}
                        <div className="template-head">
                            <div className="template-thumbnail">
                                <span className="thumbnail-container">
                                    <img src={Avatar} alt="thumbnail"
                                         className="thumbnail-wide transparent" height="300"
                                         width="300"/>
                            </span>
                            </div>
                            <div className="template-intro dashboard">
                                <h3>Welkom in jouw gebruikers profiel</h3>
                                <p>Hier kun je je gegevens bekijken en (ooit) je wachtwoord
                                    aanpassen.
                                    <br/> Moderators kunnen hier de gegevens bekijken van alle
                                    bestaande gebruikers.</p>
                            </div>
                        </div>
                        <div className="template-main-content">
                            <div className="template-main-content--wrapper">
                                <h2>Gegevens</h2>
                                {user ?

                                    <>
                                        <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                                        <p><strong>E-mail:</strong> {user.email}</p>
                                        <p>
                                            <button type="submit">verander wachtwoord</button>
                                        </p>
                                    </>

                                    :

                                    <div>
                                        <h2>Je bent niet ingelogd</h2>
                                        <p>Heb je een account? Ga dan hier <Link
                                            to="/login"> naar de inlog pagina</Link>.</p>
                                    </div>
                                }
                                {error && <p className="error-message">{error}</p>}
                                <hr/>

                                <section className="dashboard__user-data">
                                    {/* admin users zien hier andere content dan gewone users */}
                                    {user.username === "admin" ?
                                        <>
                                            <h2>Moderator Dashboard</h2>
                                            <div>
                                                <h2>Gegevens</h2>
                                                <p><strong>Moderator
                                                    gebruikersnaam:</strong> {user.username}</p>
                                                <p><strong>Moderator e-mail:</strong> {user.email}
                                                </p>
                                                <p>
                                                    <button type="submit">verander wachtwoord
                                                    </button>
                                                </p>
                                            </div>
                                            <h3>Alle geregistreerde gebruikers</h3>
                                            <div>
                                                {loading && <Loader/>}
                                                <ul className="mapped__posts">
                                                    {privateContent.data && privateContent.data.map((post) => {
                                                            console.log("Post data:");
                                                            console.log(post);
                                                            return <li
                                                                key={Object.keys(post.username).length > 0
                                                                && post.username}>
                                                                <ul>
                                                                    <li>Gebruikersnaam: {Object.keys(post.username).length > 0 &&
                                                                    post.username}</li>
                                                                    <li>E-mail: {Object.keys(post.email).length > 0
                                                                    && post.email}</li>
                                                                    <li>Wachtwoord
                                                                        (gecodeerd): {Object.keys(post.password).length > 0
                                                                        && post.password}</li>
                                                                    {/*<li>Rechten: {post.authorities && post.authorities[1].authority}</li>*/}
                                                                </ul>
                                                            </li>
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                            <hr/>
                                            <p>URL's for development testing only, not for
                                                testers</p> 
                                            <Link to="/searchschets">
                                                <p>SearchSCHETS</p>
                                            </Link>
                                            <Link to="/photoschets">
                                                <p>ToiletPhotoSCHETS</p>
                                            </Link>
                                            <Link to="/patchschets">
                                                <p>ToiletPatchSCHETS</p>
                                            </Link>
                                        </>
                                        :
                                        <p>:-)</p>
                                    }
                                </section>
                                {/*einde afgeschermde content*/}

                                <section className="faq">
                                    <h3>Closette: Hoe werkt het?</h3>
                                    <p>Uitgebreide informatie en een handleiding kun je vinden in
                                        de <Link to="/info/faq-handleiding">f.a.q. pagina</Link>.</p>
                                    <ul>
                                        <li>Alle gebruikers, ook die niet ingelogd zijn, kunnen
                                            zoeken naar
                                            toiletten.
                                        </li>
                                        <li>De zoekresultaten kunnen getrechterd worden via de
                                            verschillende
                                            filtereigenschappen van toiletten (stad, land,
                                            gratis/niet-gratis,
                                            wel/niet
                                            genderneutraal, toegankelijk voor minder validen,
                                            half-openbaar,
                                            heeft wel/geen foto, openingstijden, waardering).
                                        </li>
                                        <li>Alle ingelogde gebruikers kunnen een sterrenwaardering
                                            per toilet geven.
                                        </li>
                                        <li>Ingelogde gebruikers kunnen nieuwe toiletten plaatsen
                                            met daarbij het
                                            adres,
                                            een beschrijving en kunnen eventueel een foto uploaden.
                                        </li>
                                        <li>Moderators hebben de mogelijkheid om posts te censureren
                                            of
                                            verwijderen
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </article>
                    <div>
                        <Link to="/">&lt;&lt; Home</Link>
                    </div>
                </section>
            </main>
            <BackButton/>
        </>
    );
}

export default DashboardPage;