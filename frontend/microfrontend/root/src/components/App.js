import React, {lazy, Suspense, useEffect} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import {CurrentUserContext} from 'microfrontend_shared-lib';
import Header from "./Header";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import useRegisterLogic from "auth/registerLogic";
import useLoginLogic from "auth/loginLogic";
import useAuthEffect from "auth/useAuthEffect";
import {useEditAvatarPopupState, handleUpdateAvatar} from "profile/editAvatarPopupLogic";
import {useEditProfilePopupState, handleUpdateUser} from "profile/editProfilePopupLogic";
import {useAddPlacePopupLogic} from "cards/addPlacePopupLogic";
import {useImagePopupLogic} from "cards/imagePopupLogic";
import {useCardsLogic} from "cards/cardLogic";
import api from "../utils/api";
import InfoTooltip from "./InfoTooltip";

const Register = lazy(() => import("auth/Register").catch(() => {
    return {default: () => <>Component Register is not available!</>};
}));

const Login = lazy(() => import("auth/Login").catch(() => {
    return {default: () => <>Component Register is not available!</>};
}));

const EditAvatarPopup = lazy(() => import("profile/EditAvatarPopup").catch(() => {
    return {default: () => <>Component Register is not available!</>};
}));

const EditProfilePopup = lazy(() => import("profile/EditProfilePopup").catch(() => {
    return {default: () => <>Component Register is not available!</>};
}));

const AddPlacePopup = lazy(() => import("cards/AddPlacePopup").catch(() => {
    return {default: () => <>Component Register is not available!</>};
}));

const ImagePopup = lazy(() => import("cards/ImagePopup").catch(() => {
    return {default: () => <>Component Register is not available!</>};
}));

function App() {

    const {
        isAddPlacePopupOpen,
        closeAddPlacePopup,
        openAddPlacePopup,
        addPlaceSubmit
    } = useAddPlacePopupLogic();

    const {
        selectedCard,
        handleCardClick
    } = useImagePopupLogic();

    const {
        cards,
        setCards,
        handleCardLike,
        handleCardDelete
    } = useCardsLogic();

    const handleAddPlaceSubmit = (newCard) => {
        addPlaceSubmit(newCard, cards, setCards);
    };

    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState();
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const handleRegister = useRegisterLogic(setTooltipStatus, setIsInfoToolTipOpen, history);
    const handleLogin = useLoginLogic(setIsLoggedIn, setEmail, setTooltipStatus, setIsInfoToolTipOpen, history);

    useAuthEffect(setEmail, setIsLoggedIn, history);

    const {
        isEditAvatarPopupOpen,
        openEditAvatarPopup,
        closeEditAvatarPopup,
    } = useEditAvatarPopupState(); // Вызов функции
    const handleUpdateAvatarFn = (avatarUpdate) => handleUpdateAvatar(avatarUpdate, setCurrentUser);

    const {
        isEditProfilePopupOpen,
        openEditProfilePopup,
        closeEditProfilePopup,
    } = useEditProfilePopupState(); // Вызов функции
    const handleUpdateUserFn = (userUpdate) => handleUpdateUser(userUpdate, setCurrentUser);

    useEffect(() => {
        api
            .getAppInfo()
            .then(([cardData, userData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            })
            .catch((err) => console.log(err));
        console.dir("currentUser " + currentUser)
    }, []);

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        history.push("/signin");
    }

    function closeAllPopups() {
        closeEditAvatarPopup();
        closeEditProfilePopup();
        closeAddPlacePopup(false);
        setIsInfoToolTipOpen(false);
        handleCardClick(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">

                <Header email={email} onSignOut={onSignOut}/>

                <Switch>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProtectedRoute
                            exact
                            path="/"
                            component={Main}
                            cards={cards}
                            onEditProfile={openEditProfilePopup}
                            onAddPlace={openAddPlacePopup}
                            onEditAvatar={openEditAvatarPopup}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            loggedIn={isLoggedIn}
                        />
                        <Route path="/signin">
                            <Login onLogin={handleLogin}/>
                        </Route>
                        <Route path="/signup">
                            <Register onRegister={handleRegister}/>
                        </Route>
                    </Suspense>
                </Switch>
                <Footer/>
                <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
                <Suspense fallback={<div>Loading...</div>}>
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onAddPlace={handleAddPlaceSubmit}
                        onClose={closeAllPopups}
                    />
                    <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatarFn}
                    />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUserFn}
                    />
                    <InfoTooltip
                        isOpen={isInfoToolTipOpen}
                        onClose={closeAllPopups}
                        status={tooltipStatus}
                    />
                </Suspense>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
