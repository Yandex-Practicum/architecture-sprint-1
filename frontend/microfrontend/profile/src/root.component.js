import React, {useState} from "react";
import "./style.css"
import "./auth-form/auth-form.css"
import api from "../../../src/utils/api";
import {BrowserRouter, Link, Route} from "react-router-dom";
import {login, register} from "../../../src/utils/auth";
import InfoTooltip from "./InfoTooltip";
import "./popup/popup.css"

const globalData = {
  user: {
    name: 'John Doe',
    about: 'about',
    avatar: ''
  }
};

export default function Root(props) {
  const [userData, setUserData] = useState(globalData)
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    api
        .getAppInfo()
        .then(([cardData, userData]) => {
          setUserData(userData)
        })
        .catch((err) => console.log(err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    let data = login(email, password).then(data => {
      localStorage.setItem("jwt", data.token)
      localStorage.setItem("email", email)
      window.location.replace("/")
    });
  }

  function handleSubmitReg(e) {
    e.preventDefault();
    register(email, password)
        .then((res) => {
          history.push("/signin");
        })
  }

  const imageStyle = {backgroundImage: `url(${userData.avatar})`};
  return <BrowserRouter>
    <Route exact path="/">
      <section className="profile page__section">
        <div className="profile__image" style={imageStyle} onClick={() => {
        }}></div>
        <div className="profile__info">
          <h1 className="profile__title">{userData.name}</h1>
          <button className="profile__edit-button" type="button" onClick={() => {
          }}></button>
          <p className="profile__description">{userData.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={() => {
        }}></button>
      </section>
    </Route>
    <Route exact path="/signin">
      {/*<div className="pagee">*/}
      {/*    <InfoTooltip*/}
      {/*        isOpen={true}*/}
      {/*        onClose={() => {*/}
      {/*        }}*/}
      {/*        status="success"*/}
      {/*    />*/}
      {/*</div>*/}
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Вход</h3>
            <label className="auth-form__input">
              <input type="text" name="name" id="email"
                     className="auth-form__textfield" placeholder="Email"
                     onChange={e => setEmail(e.target.value)} required/>
            </label>
            <label className="auth-form__input">
              <input type="password" name="password" id="password"
                     className="auth-form__textfield" placeholder="Пароль"
                     onChange={e => setPassword(e.target.value)} required/>
            </label>
          </div>
          <button className="auth-form__button" type="submit">Войти</button>
        </form>
      </div>
    </Route>
    <Route exact path="/signup">
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmitReg}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Регистрация</h3>
            <label className="auth-form__input">
              <input type="text" name="email" id="email"
                     className="auth-form__textfield" placeholder="Email"
                     onChange={e => setEmail(e.target.value)} required/>
            </label>
            <label className="auth-form__input">
              <input type="password" name="password" id="password"
                     className="auth-form__textfield" placeholder="Пароль"
                     onChange={e => setPassword(e.target.value)} required/>
            </label>
          </div>
          <div className="auth-form__wrapper">
            <button className="auth-form__button" type="submit">Зарегистрироваться</button>
            <p className="auth-form__text">Уже зарегистрированы? <Link className="auth-form__link"
                                                                       to="/signin">Войти</Link></p>
          </div>
        </form>
      </div>
    </Route>
  </BrowserRouter>;
}
