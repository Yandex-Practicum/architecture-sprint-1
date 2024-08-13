import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Profile from './components/Profile';

import './index.css';

function PopupWithForm({
    title,
    name,
    isOpen,
    buttonText = 'Сохранить',
    onSubmit,
    onClose,
    children,
  }) {
    return (
      <dialog open={isOpen}>
        <form name={name} noValidate onSubmit={onSubmit}>
            <button type="button" onClick={onClose}>x</button>
            <h3>{title}</h3>
            {children}
            <button type="submit">{buttonText}</button>
        </form>
      </dialog>
    );
  }

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Profile setCurrentUser={console.log} onAddPlace={console.log} PopupWithForm={PopupWithForm} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

export {};
