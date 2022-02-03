import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import AvatarDownload from "../../components/photoupload/AvatarDownload";
import AvatarUpload from "../../components/photoupload/AvatarUpload";
import ChangePassword from "./ChangePassword";


function DashboardPage() {

    useEffect(() => {
        document.title = "Mijn dashboard :: Closette"
        setTimeout(() => {
            window.scrollTo({top: 0, behavior: 'smooth'})
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");
    }, []);

    const [privateContent, setPrivateContent] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const {user} = useContext(AuthContext);
    console.log("ingelogde user heet:", user);
    const [modal, toggleModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('closetteToken');

        // private content for Admins
        if (user && user.username === "admin") {
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
            console.log("Admin is niet ingelogd");
        }

    }, []);

    const toggleModalClass = () => {
        toggleModal(!modal);
    };

    return (

        <>
            <TopNav/>
            <Header
                title="Mijn Dashboard"/>
            <main className="dashboard__page content-wrapper">
                <section className="template">
                    <article>
                        {error && <p className="error-message">{error}</p>}
                        {loading && <Loader/>}
                        <div className="template-head">
                            <div className="template-thumbnail">

                                <AvatarDownload/>
                                {user &&
                                <>
                                    <AvatarUpload/>
                                </>}

                            </div>
                            <div className="template-intro dashboard">
                                <h3>Welkom in jouw gebruikers profiel</h3>
                                <p>Als je bent ingelogd, kun je hier je gegevens bekijken en je
                                    wachtwoord
                                    aanpassen.
                                    <br/> Moderators kunnen hier de gegevens bekijken van alle
                                    bestaande gebruikers.</p>
                            </div>
                        </div>

                        <div className="template-main-content">
                            <div>
                                <h2>Gegevens</h2>
                                {user ?

                                    <>
                                        <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                                        <p><strong>E-mail:</strong> {user.email}</p>
                                        <p>
                                            <button type="button" onClick={toggleModalClass}>
                                                verander wachtwoord
                                            </button>
                                        </p>
                                        <div className={`modal__wrapper ${modal
                                            ? 'open'
                                            : 'hidden'}`}>
                                            <div className="modal__body">
                                                <p className="close">
                                                    <button type="button"
                                                            onClick={toggleModalClass}>
                                                        &#9587; Sluit
                                                    </button>
                                                </p>
                                                <ChangePassword/>
                                            </div>
                                        </div>
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

                                    {user && user.username === "admin" ?
                                        <>
                                            <h2>Moderator Dashboard</h2>
                                            <div>
                                                <h2>Gegevens</h2>
                                                <p><strong>
                                                    Moderator
                                                    gebruikersnaam:</strong> {user.username}
                                                    <br/><strong>Moderator
                                                        e-mail:</strong> {user.email}
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
                                                                    <p>Gebruikersnaam: {Object.keys(post.username).length > 0 &&
                                                                    post.username}</p>
                                                                    <p>E-mail: {Object.keys(post.email).length > 0
                                                                    && post.email}</p>
                                                                    <p className="word-break">Wachtwoord
                                                                        (gecodeerd): {Object.keys(post.password).length > 0
                                                                        && post.password}</p>
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
                                            <Link to="/toiletrating/:id">
                                                <p>SearchSCHETS</p>
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
                                        de <Link to="/info/faq-handleiding">f.a.q. pagina</Link>.
                                    </p>
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