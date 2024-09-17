import React, { lazy, Suspense, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import { CurrentUserContext, createListener, sendEvent } from "shared_shared";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

const Login = lazy(() => import('user/Login').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
}));
const Register = lazy(() => import('user/Register').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
}));
const UserPopups = lazy(() => import('user/Popups').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
}));
const CardPopups = lazy(() => import('card/Popups').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
}));



function App() {
  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const closeAllPopups = sendEvent('closeAllPopups');

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  useEffect(createListener('closeAllPopups', () => setIsInfoToolTipOpen(false)));
  useEffect(createListener('openTooltip', (message) => {
    setTooltipStatus(message);
    setIsInfoToolTipOpen(true);
  }))

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
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
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={isLoggedIn}
            />
          <Route path="/signup">

            <Suspense fallback={<div>Loading... </div>}>
              <Register />
            </Suspense>
          </Route>
          <Route path="/signin">
            <Suspense fallback={<div>Loading... </div>}>
              <Login />
            </Suspense>
          </Route>
        </Switch>
        <Footer />
        <UserPopups />
        <CardPopups />
        {/* <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" /> */}
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
