import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"

import "./index.css";

const Button = React.lazy(() => import("auth_microfrontend/Button"))
const Counter = React.lazy(() => import("auth_microfrontend/Counter"))
const Login = React.lazy(() => import("auth_microfrontend/Login"))
const Register = React.lazy(() => import("auth_microfrontend/Register"))
const InfoTooltip = React.lazy(() => import("auth_microfrontend/InfoTooltip"))
const PopupWithForm = React.lazy(() => import("shared_components/PopupWithForm"))

const App = () => {
  // const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  // const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  // const [selectedCard, setSelectedCard] = React.useState(null);
  // const [cards, setCards] = React.useState([]);
  //
  // const [currentUser, setCurrentUser] = React.useState({});
  //
  // const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  // const [tooltipStatus, setTooltipStatus] = React.useState("");
  //
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [email, setEmail] = React.useState("");
  //
  // const history = useHistory();

    return (
      <div className="container">
            <Counter/>
            <Login />
            <Button buttonName={"click me"} />
            <Register />
            <InfoTooltip />
            <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
      </div>
  )
};

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
    <BrowserRouter><App /></BrowserRouter>
)