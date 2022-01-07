import React, {useEffect} from 'react';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";

function DashboardPage(props) {

    useEffect(() => {
        document.title = "Mijn dashboard :: Closette"
    }, []);

    return (
        <section className="dashboard__page">
            <TopNav/>
            <Header
                title="Gebruikers dashboard"/>
        </section>
            );
            }

            export default DashboardPage;