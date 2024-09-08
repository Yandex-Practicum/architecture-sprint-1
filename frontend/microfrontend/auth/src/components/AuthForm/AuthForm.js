import {useState, useMemo} from "react";

import '../../utils/auth';

import './auth-form/auth-form.css';
import * as auth from "../../utils/auth";

export default function AuthForm({isAuth, setIsLoggedIn, history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        isAuth ?
            auth
                .login(email, password)
                .then((res) => {
                    setIsLoggedIn(true);
                    // setEmail(email);
                    console.log('history');
                    console.log(history);
                    history.push("/");
                })
                .catch((err) => {
                    console.log('login error');
                    console.log(err);
                    /*
                    setTooltipStatus("fail");
                    setIsInfoToolTipOpen(true);
                     */
                })
            :
            auth
                .register(email, password)
                .then((res) => {
                    console.log('register success');
                    /*
                    setTooltipStatus("success");
                    setIsInfoToolTipOpen(true);
                    history.push("/signin");
                     */
                })
                .catch((err) => {
                    console.log('register error');
                    /*
                    setTooltipStatus("fail");
                    setIsInfoToolTipOpen(true);
                     */
                });
    };

    const title = useMemo(() => isAuth ? 'Вход' : 'Регистрация', [isAuth]);
    const btnText = useMemo(() => isAuth ? 'Войти' : 'Регистрация', [isAuth]);

    return (<div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
            <div className="auth-form__wrapper">
                <h3 className="auth-form__title">{title}</h3>
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
            <button className="auth-form__button" type="submit">{btnText}</button>
        </form>
    </div>);
}