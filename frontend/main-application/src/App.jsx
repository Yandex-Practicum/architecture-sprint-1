import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"

import "./index.css";

const Login = React.lazy(() => import("auth_microfrontend/Login"))
const Register = React.lazy(() => import("auth_microfrontend/Register"))
const InfoTooltip = React.lazy(() => import("auth_microfrontend/InfoTooltip"))
const PopupWithForm = React.lazy(() => import("shared_components/PopupWithForm"))
const globalStore = React.lazy(() => import("store/globalStore"))


const App = observer(() => {
    import('auth_microfrontend/AuthService')
        .then((module) => {
            const AuthService = module.default;
            const authServiceInstance = new AuthService('https://auth.nomoreparties.co');
            authServiceInstance.debug();
        })
        .catch((error) => console.error('Ошибка при импорте AuthService:', error));

    return (
        <div className="container">
            123
        </div>
    );
});

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
    <BrowserRouter><App /></BrowserRouter>
)