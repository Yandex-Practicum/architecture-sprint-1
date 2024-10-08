import React from "react";
import "../blocks/auth-form/auth-form.css";

import * as auth from "../utils/auth";

function Register({ onRegisterSuccess, onRegisterFailure }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then(onRegisterSuccess)
      .catch(onRegisterFailure);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Регистрация</h3>
          <label className="auth-form__input">
            <input
              type="text"
              name="email"
              id="email"
              className="auth-form__textfield"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="auth-form__input">
            <input
              type="password"
              name="password"
              id="password"
              className="auth-form__textfield"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;