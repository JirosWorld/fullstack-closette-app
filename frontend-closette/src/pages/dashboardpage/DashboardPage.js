import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Accordeon from "../../components/accordeon/Accordeon";
import GPS from "../../assets/img/MapsViewGPSCoordinates-iPhone.jpg";
import Loader from "../../components/loader/Loader";

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
                setError("Je bent geen moderator dus je ziet hier alleen je eigen gegevens.");
                console.error(e);
            }
            toggleLoading(false);
        }

        getPrivateContent();
    }, []);

    return (

        <>
            <TopNav/>
            <Header
                title="Mijn Dashboard + F.A.Q."/>
            <div className="dashboard__page content-wrapper">
                <section className="dashboard__user-data">
                    {user ? <h2>Gegevens</h2> :
                        <>
                            <h2>Je bent niet ingelogd</h2>
                            <p>Heb je een account? Ga dan hier <Link
                                to="/login"> naar de inlog pagina</Link>.</p>
                        </>}
                    {error && <p className="error-message">{error}</p>}
                    {user &&
                    <>
                        <p><strong>Jouw gebruikersnaam:</strong> {user.username}</p>
                        <p><strong>Jouw e-mail:</strong> {user.email}</p>
                        <p>
                            <button type="submit">verander wachtwoord</button>
                        </p>
                    </>
                    }
                    {user.username === "admin" ?
                        <>
                            <h2>Moderator Dashboard</h2>
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
                        </>
                        :
                        <span>:-)</span>
                    }
                </section>
                {user &&
                <section className="faq">
                    <h3>Veel gestelde vragen</h3>
                    <h4>Closette: Hoe werkt het?</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum
                        debitis
                        dolor dolore fuga id molestias qui quo unde?</p>
                    <ul>
                        <li>Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar
                            toiletten.
                        </li>
                        <li>De zoekresultaten kunnen getrechterd worden via de verschillende
                            filtereigenschappen van toiletten (stad, land, gratis/niet-gratis,
                            wel/niet
                            genderneutraal, toegankelijk voor minder validen, half-openbaar, vies of
                            schoon, heeft wel/geen foto, openingstijden, waardering).
                        </li>
                        <li>Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
                        </li>
                        <li>Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het
                            adres,
                            een beschrijving en kunnen eventueel een foto uploaden.
                        </li>

                        <li>Moderators hebben de mogelijkheid om posts te censureren of
                            verwijderen
                        </li>
                    </ul>

                    <BackButton/>
                </section>
                }
                {/*einde afgeschermde content*/}
            </div>
        </>
    );
}

export default DashboardPage;