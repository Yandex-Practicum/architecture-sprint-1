import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useHistory } from "react-router-dom"

import "./index.css";
import apiService from "./apiService";
import api from "../../src/utils/api";

const Button = React.lazy(() => import("auth_microfrontend/Button"))
const Counter = React.lazy(() => import("auth_microfrontend/Counter"))
const Login = React.lazy(() => import("auth_microfrontend/Login"))
const Register = React.lazy(() => import("auth_microfrontend/Register"))
const InfoTooltip = React.lazy(() => import("auth_microfrontend/InfoTooltip"))
const PopupWithForm = React.lazy(() => import("shared_components/PopupWithForm"))
const globalStore = React.lazy(() => import("store/globalStore"))

const App = observer(() => {
    const [store, setStore] = useState(null);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    const [currentUser, setCurrentUser] = React.useState({});

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");

    // const history = useHistory();

    // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
        apiService
            .getAppInfo()
            .then(([cardData, userData]) => {
                setCurrentUser(userData);
                setCards(cardData);
                console.log('userdata is set');
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const loadStore = async () => {
            const remoteStore = await import("store/globalStore");
            setStore(remoteStore.default);
        };

        loadStore();
    }, []);

    useEffect(() => {
        if (store) {
            console.log("cardData:", store.cards);
            console.log("userData:", store.user);
            store.setCurrentUser({ name: "John Doe", age: 30 });
            store.setCards([{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }]);
        }
    }, [store]);

    const updateUser = () => {
        if (store) {
            store.setCurrentUser({ name: "Jane Smith", age: 25 });
        }
    };

    if (!store) {
        return <div>Loading...</div>;
    }

    // methods:
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(userUpdate) {
        apiService
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        apiService
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        apiService
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        apiService
            .removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        apiService
            .addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }


    return (
        <div className="container">
            <div>Name: {store.currentUser.name}</div>
            <div>Age: {store.currentUser.age}</div>
            <button onClick={updateUser}>Update User</button>
        </div>
    );
});

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
    <BrowserRouter><App /></BrowserRouter>
)