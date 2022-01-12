import React, {useEffect} from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage/HomePage";
import SearchPage from "./pages/searchpage/SearchPage";
import SubmitPage from "./pages/submitpage/SubmitPage";
import ContactPage from "./pages/contactpage/ContactPage";
import NewsFeedPage from "./pages/newsfeedpage/NewsFeedPage";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import DashboardPage from "./pages/dashboardpage/DashboardPage";
import SearchResults from "./pages/searchresults/SearchResults";
import Footer from "./components/footer/Footer";

function App() {

    // Title veranderen bij mounting
    useEffect(() => {
        document.title = "~ Closette ::: de genderneutrale toiletzoeker app ~"
    }, []);

    return (
        <>
            <div className="main container">
                <Switch>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route exact path="/search">
                        <SearchPage/>
                    </Route>
                    <Route exact path="/searchresults">
                        <SearchResults/>
                    </Route>
                    <Route path="/submit">
                        <SubmitPage/>
                    </Route>
                    <Route path="/news">
                        <NewsFeedPage/>
                    </Route>
                    <Route path="/contact">
                        <ContactPage/>
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/signup">
                        <RegisterPage/>
                    </Route>
                    <Route path="/dashboard">
                        <DashboardPage/>
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                </Switch>
            </div>
            <Footer/></>
    );

}

export default App;
