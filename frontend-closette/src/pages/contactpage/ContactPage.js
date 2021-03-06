import React, {useEffect} from 'react';
import "./ContactPage.css";
import Header from "../../components/header/Header";
import TopNav from "../../components/topnav/TopNav";
import BackButton from "../../components/buttons/BackButton";
import {ContactUs} from "./ContactUs";

function ContactPage() {

    useEffect(() => {
        document.title = "Contact :: Closette"

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 0);
        console.log("De pagina begint met de window naar boven gescrolld");

    }, []);

    return (

        <>
            <TopNav/>
            <Header
                title="Contactpagina"/>
            <main className="contact__page  content-wrapper">
                <p>Heb je een vraag? Of: zie je iets in de app dat niet okee is? Stuur ons
                    dan een bericht. (Let op: Voer <em>alleen je eigen mailadres</em> in, want er wordt een bevestiging naartoe gestuurd).</p>
                <ContactUs/>
            </main>
            <BackButton/>
        </>
    );
}

export default ContactPage;