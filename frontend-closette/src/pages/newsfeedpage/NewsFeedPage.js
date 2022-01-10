import React, {useEffect} from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import FeedSection from "../../components/sections/FeedSection/FeedSection";
import BackButton from "../../components/buttons/BackButton";

function NewsFeedPage(props) {

    useEffect(() => {
        document.title = "Nieuwsoverzicht :: Closette"
    }, []);

    return (
        <section className="news__page">
            <TopNav/>
            <Header
                title="Nieuws"/>
            <div>
                <p>Voor iedereen, die niet achter een boom kan plassen, is  het vaak erg lastig om een gratis openbaar toilet te vinden. Daarnaast is het voor non-binaire en transgender personen nog veel lastiger om een (veilig) genderneutraal toilet te vinden. Er is behoefte aan een systeem dat gendervariabele mensen in staat stelt om makkelijk het adres van een genderneutraal toilet te zoeken, of, als je er zelf 1 hebt gevonden, deze te posten via een browser portal. Een extra bij-effect van deze ‘Closette’ app is dat ook niet-trans personen zo makkelijker een veilig of toegankelijk toilet kunnen vinden. Voor vrouwen zijn er immers ook al jaren veel te weinig gratis toiletten beschikbaar.</p>
            </div>
            <FeedSection />
            <BackButton />
        </section>
    );
}

export default NewsFeedPage;