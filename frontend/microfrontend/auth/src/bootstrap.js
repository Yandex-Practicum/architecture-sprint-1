import React from 'react';
import ReactDOM from 'react-dom';
import AuthApp from "./components/AuthApp";
import {HashRouter} from "react-router-dom";
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <AuthApp />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
