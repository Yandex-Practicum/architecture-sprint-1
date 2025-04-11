import React, {lazy, Suspense, useEffect, useState} from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import {Route, Switch, useHistory} from "react-router-dom";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import api from "../utils/api";

const Auth = lazy(() => import('MFAuth/Auth').catch(() => {
        return { default: () => 'Auth not load' };
    })
);

export default function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingApp, setIsLoadingApp] = useState(true);

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");


    function closeAllPopups() {
        setIsInfoToolTipOpen(false);
    }

    const handleTooltipChange = event => {
        setTooltipStatus(event.detail);
        setIsInfoToolTipOpen(true);
    }

    const handleJwtChange = event => { // Эта функция получает нотификации о событиях изменения jwt
        setEmail(event.detail.login);
        setIsLoggedIn(true)
        history.push("/");
    }

    const handleUserDataChange = event => {
        if(event.detail.data){
            setCurrentUser(event.detail.data);
        }else{
            api
                .getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData);
                })
                .catch((err) => console.log(err));
        }
    }



    useEffect(() => {
        addEventListener("user-update", handleUserDataChange);
        addEventListener("jwt-change", handleJwtChange);
        addEventListener("tooltip-change", handleTooltipChange);

        return () => {
            removeEventListener("jwt-change", handleJwtChange)
            removeEventListener("tooltip-change", handleTooltipChange);
            removeEventListener("user-update", handleUserDataChange);
        }
    }, []);

    const history = useHistory();

    useEffect(() => {
        api
            .getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
                setIsLoadingApp(false)
            })
            .catch((err) => console.log(err));
    }, []);

    // при монтировании App описан эффект, проверяющий наличие токена и его валидности
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, [history]);

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        history.push("/signin");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header email={email} onSignOut={onSignOut}/>

                {
                    isLoadingApp ?
                    <main className="content"
                          style={{color: 'white', paddingTop: '30px', textAlign: 'center', fontSize: '16px'}}
                    >Загрузка страницы...</main>
                    :
                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/"
                            component={Main}
                            loggedIn={isLoggedIn}
                        />
                        <Route path="/signup">
                            <Suspense fallback="loading…">
                                <Auth state={'Register'}/>
                            </Suspense>
                        </Route>
                        <Route path="/signin">
                            <Suspense fallback="loading…">
                                <Auth state={'Login'}/>
                            </Suspense>
                        </Route>
                    </Switch>
                }


                <Footer />


                <InfoTooltip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    status={tooltipStatus}
                />
            </div>
        </CurrentUserContext.Provider>
)
};
