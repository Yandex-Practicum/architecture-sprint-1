import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import init1 from "img_add_microfrontend/img_add_microfrontend_init";
import init2 from "img_card_microfrontend/img_card_microfrontend_init";
import init3 from "user_auth_microfrontend/user_auth_microfrontend_init";
import init4 from "user_profile_microfrontend/user_profile_microfrontend_init";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

init1();
init2();
init3();
init4();
