import React, {useEffect, useState} from "react";
import './style.css';
import Logo from "./logo.svg"
import api from "../../../src/utils/api";
import {BrowserRouter, Link, Route} from "react-router-dom";

const globalData = {
    user: {
        name: 'John Doe',
        email: 'john@example.com',
        about: 'about',
        avatar: ''
    }
};

export default function Root(props) {

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        if (!token && !window.location.href.includes("/signin")) {
            window.location.replace("/signin")
        }
    }, []);

    const [userData, setUserData] = useState(globalData)

    React.useEffect(() => {
        api
            .getAppInfo()
            .then(([cardData, userData]) => {
                setUserData(userData)
            })
            .catch((err) => console.log(err));
    }, []);

    function handleSubmit(e) {
        e.preventDefault()
        localStorage.clear()
        window.location.replace("/")
    }

    return <header className="header page__section">
        <BrowserRouter>
            <img src={Logo} alt="Логотип проекта Mesto" className="logo header__logo"/>
            <Route exact path="/">
                <div className="header__wrapper">
                    <p className="header__user">{localStorage.getItem("email")}</p>
                    <button className="header__logout" onClick={handleSubmit}>Выйти
                    </button>
                </div>
            </Route>
            <Route path="/signup">
                <Link className="header__auth-link" to="signin">Войти</Link>
            </Route>
            <Route path="/signin">
                <Link className="header__auth-link" to="signup">Регистрация</Link>
            </Route>
        </BrowserRouter>
    </header>
}
