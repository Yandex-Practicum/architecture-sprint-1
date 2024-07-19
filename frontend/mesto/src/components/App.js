import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

/**
 * Remote auth
 */
import Login from "auth/Login";
import Register from "auth/Register";
import * as authUtils from "auth/utils";

/**
 * Remote profile
 */
import EditAvatarPopup from "profile/EditAvatarPopup";
import EditProfilePopup from "profile/EditProfilePopup";
import profileApi from "profile/api";

/**
 * Remote posts
 */
import PostsFeed from "post/PostsFeed";
import AddPlacePopup from "post/AddPlacePopup";
import ImagePopup from "post/ImagePopup";
import postApi from "post/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    Promise.all([postApi.getCardList(), profileApi.getUserInfo()]).then(
      ([cardData, userData]) => {
        setCards(cardData);
        setCurrentUser(userData);
      }
    );
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      authUtils
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

  function handleUpdateUserSuccess(newUserData) {
    setCurrentUser(newUserData);
    closeAllPopups();
  }

  function handleUpdateAvatarSuccess(newUserData) {
    setCurrentUser(newUserData);
    closeAllPopups();
  }

  function handleCardLikeSuccess(newCards) {
    setCards(newCards);
  }

  function handleCardDeleteSuccess(newCards) {
    setCards(newCards);
  }

  function handleAddPlaceSubmitSuccess(newCards) {
    setCards([newCards, ...cards]);
    closeAllPopups();
  }

  function onRegisterSuccess() {
    setTooltipStatus("success");
    setIsInfoToolTipOpen(true);
    history.push("/signin");
  }

  function onRegisterFailure() {
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
  }

  function onLoginSuccess() {
    setIsLoggedIn(true);
    setEmail(email);
    history.push("/");
  }

  function onLoginFailure() {
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
  }

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          {/*Роут / защищён HOC-компонентом ProtectedRoute*/}
          <ProtectedRoute
            exact
            path="/"
            component={PostsFeed}
            cards={cards}
            currentUser={currentUser}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            handleCardLikeSuccess={handleCardLikeSuccess}
            handleCardDeleteSuccess={handleCardDeleteSuccess}
            loggedIn={isLoggedIn}
          />
          {/*Роут /signup и /signin не является защищёнными, т.е оборачивать их в HOC ProtectedRoute не нужно.*/}
          <Route path="/signup">
            <Register
              onRegisterSuccess={onRegisterSuccess}
              onRegisterFailure={onRegisterFailure}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLoginSuccess={onLoginSuccess}
              onLoginFailure={onLoginFailure}
            />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          currentUser={currentUser}
          isOpen={isEditProfilePopupOpen}
          handleUpdateUserSuccess={handleUpdateUserSuccess}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          handleAddPlaceSubmitSuccess={handleAddPlaceSubmitSuccess}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          handleUpdateAvatarSuccess={handleUpdateAvatarSuccess}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
