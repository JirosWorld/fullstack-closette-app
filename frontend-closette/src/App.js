import React, {useEffect} from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import './App.css';
import HomePage from "./pages/homepage/HomePage";
import SearchPage from "./pages/searchpage/SearchPage";
import SubmitPage from "./pages/submitpage/SubmitPage";
import ContactPage from "./pages/contactpage/ContactPage";
import NewsFeedPage from "./pages/newsfeedpage/NewsFeedPage";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import DashboardPage from "./pages/dashboardpage/DashboardPage";

function App() {

    // Title veranderen bij mounting
    useEffect(() => {
        document.title = "Closette :: genderneutrale toiletten zoeken"
    }, []);

    // Webtoken: verander dit getal wanneer deze verlopen is
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0MjI1MjEzMCwiaWF0IjoxNjQxMzg4MTMwfQ.yauYw0EQTXpV4Nq0U5qf5gwxpPbVrefKAsaTqHQ-Cuo";

    const decoded = jwt_decode(token);

    return (
        <div className="main container">
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/search" >
                    <SearchPage />
                </Route>
                <Route path="/submit">
                    <SubmitPage />
                </Route>
                <Route path="/news">
                    <NewsFeedPage />
                </Route>
                <Route path="/contact">
                    <ContactPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/signup">
                    <RegisterPage />
                </Route>
                <Route path="/dashboard">
                    <DashboardPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
            </Switch>
        </div>
    );

}

export default App;
