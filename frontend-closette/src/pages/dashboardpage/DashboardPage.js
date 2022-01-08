import React, {useEffect, useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";
import BackButton from "../../components/buttons/BackButton";
import {Link} from "react-router-dom";

function DashboardPage(props) {

    useEffect(() => {
        document.title = "Mijn dashboard :: Closette"
    }, []);

    const {user} = useContext(AuthContext);
    console.log(user); // geeft { user: { username: 'string waarde', email: 'string waarde', id: 'string waarde', country: 'string waarde' }

    return (
        <>
            <TopNav/>
            <Header
                title="Mijn Gebruikers-Dashboard"/>
            <section className="dashboard__user-data">
                {user ? <h2>Gegevens</h2> :
                    <>
                        <h2>Je bent niet ingelogd</h2>
                        <p>Heb je een account? Ga dan hier <Link
                            to="/login"> naar de inlog pagina</Link>.</p>
                    </>}
                {user &&
                <>
                    <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </>
                }
            </section>
            {user &&
            <section className="dashboard__content">
                <h3>Veel gestelde vragen</h3>
                <h4>Closette; Hoe werkt het?</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis
                    dolor dolore fuga id molestias qui quo unde?</p>
                <BackButton/>
            </section>
            }

        </>
    );
}

export default DashboardPage;