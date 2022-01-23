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
import NewsPost from "./pages/newspost-infopost/NewsPost";
import ToiletPost from "./pages/toiletpost/ToiletPost";
import FaqPage from "./pages/newspost-infopost/FaqPage";
import SearchSCHETS from "./pages/searchpage/SearchSCHETS";
import ToiletPhotoSCHETS from "./pages/toiletpost/ToiletPhotoSCHETS";

// function PrivateRoute({children, isAuth, ...rest}) {
//     return (
//         <Route {...rest}>
//             {isAuth ? children : <Redirect to="/login"/>}
//         </Route>
//     )
// }

function App() {

    useEffect(() => {
        document.title = "~ Closette ::: de genderneutrale toiletzoeker app ~"
    }, []);

    return (
        <>
            <div className="body__wrapper">
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
                        <Route exact path="/toilets/:id">
                            <ToiletPost/>
                        </Route>
                        <Route path="/submit">
                            <SubmitPage/>
                        </Route>
                        <Route exact path="/news">
                            <NewsFeedPage/>
                        </Route>
                        <Route exact path="/news/:id">
                            <NewsPost/>
                        </Route>
                        <Route exact path="/info/faq-handleiding">
                            <FaqPage/>
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
                        {/*<PrivateRoute path="/dashboard" isAuth={AuthContext}>*/}
                        {/*    <DashboardPage />*/}
                        {/*</PrivateRoute>*/}
                        <Route path="/login">
                            <LoginPage/>
                        </Route>

                    {/*    URL's for development testing only, not for testers */}
                        <Route path="/searchschets">
                            <SearchSCHETS/>
                        </Route>
                        <Route path="/photoschets/toilets/:id">
                            <ToiletPhotoSCHETS/>
                        </Route>
                    </Switch>
                </div>
                <Footer/></div>
        </>
    );

}

export default App;
