import React, {useEffect} from 'react';
import "./ContactPage.css";
import Header from "../../components/header/Header";
import TopNav from "../../components/topnav/TopNav";
import BackButton from "../../components/buttons/BackButton";
import {ContactUs} from "./ContactUs";

function ContactPage() {

    useEffect(() => {
        document.title = "Contact :: Closette"
    }, []);

    return (
        <section className="contact__page">
            <TopNav/>
            <Header
                title="Contactpagina"/>
                <ContactUs />
            <BackButton />
        </section>
    );
}

export default ContactPage;