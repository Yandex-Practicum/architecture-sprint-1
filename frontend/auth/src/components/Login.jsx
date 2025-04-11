import React from 'react';

import * as auth from "../utils/auth";

function Login (){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onLogin(e){
    e.preventDefault();

    auth.login(email, password)
      .catch((e) => {
        dispatchEvent(new CustomEvent("tooltip-change", {
          detail: "fail"
        }));
      })
        .then((data) => {
            data.login = email
            dispatchEvent(new CustomEvent("jwt-change", {
                detail: data
            }));
        })
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={onLogin}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;
