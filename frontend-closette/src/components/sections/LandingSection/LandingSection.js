import React, {useContext} from 'react';
import {ReactComponent as RollSmiley} from "../../../assets/icons/icon-lines-roll-smiley-jiro.svg";
import {ReactComponent as ToiletSeat} from "../../../assets/icons/icon-lines-toilet-jiro.svg";
import {ReactComponent as Avatar} from "../../../assets/icons/icon-lines-user-jiro.svg";
import "./LandingSection.css";
import {AuthContext} from "../../../context/AuthContext";
import {Link} from "react-router-dom";

function LandingSection() {
    const {user} = useContext(AuthContext);

    return (
        <section className="landing__page">
            <div className="landing__page__content">
                <article className="landing__page__column">
                    <Link to="/search">
                        <div className="column__icon-box">
                            <RollSmiley className="svg-search" alt="lachende toiletrol"/>
                        </div>
                    </Link>
                    <h2>TOILET ZOEKEN</h2>
                    <p><Link to="/search">Zoek hier</Link> naar genderneutrale toiletten bij jou in
                        de buurt!</p>
                </article>
                {/* toon andere kolommen bij wel/nit ingelogd */}
                {user &&
                <article className="landing__page__column">
                    <Link to="/submit">
                        <div className="column__icon-box">
                            <ToiletSeat className="svg-submit" alt="lachende toiletpot"/>
                        </div>
                    </Link>
                    <h2>TOILET PLAATSEN</h2>
                    <p>Nieuw toilet gevonden? <Link to="/submit">Plaats</Link> haar/hem/hun op de
                        site!</p>
                </article>
                }
                {user ?
                    <></>
                    :
                    <article className="landing__page__column">
                        <Link to="/login">
                            <div className="column__icon-box">
                                <Avatar className="svg-avatar-black" alt="user icon"/>
                            </div>
                        </Link>
                        <h2>INLOGGEN</h2>
                        <p><Link to="/signup">Maak eerst een account</Link> om te kunnen reageren
                            of <Link to="/login"> log in</Link>.</p>
                    </article>
                }
            </div>
        </section>
    );
}

export default LandingSection;