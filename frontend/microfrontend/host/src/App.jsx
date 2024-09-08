import React, {Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import {ProtectedRoute} from "./components/ProtectedRoute";

import {MainPage} from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {authApi} from "./components/LazyImport";

import "./index.css";
const App = () => {
    const [email, setEmail] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const history = useHistory();

    useEffect(() => {
        authApi
            .then(res => res.checkTokenWithToken()
                .then(tokenRes => {
                    if(tokenRes?.data) {
                        setEmail(tokenRes.data.email);
                        setIsLoggedIn(true);
                        history.push('/');
                    }
                })

            )
    }, []);

    return (<div className="container">
        <Header setIsLoggedIn={setIsLoggedIn} email={email} />
        <Switch>
            <Suspense fallback={''}>
                <ProtectedRoute
                    exact
                    isLoggedIn={isLoggedIn}
                    path={'/'}
                    component={MainPage}
                />
                <Route path="/signin">
                    <Login setIsLoggedIn={setIsLoggedIn} history={history}/>
                </Route>
                <Route path="/signup">
                    <Register setIsLoggedIn={setIsLoggedIn} history={history}/>
                </Route>
            </Suspense>
        </Switch>
        <Footer />
    </div>);
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</React.StrictMode>)