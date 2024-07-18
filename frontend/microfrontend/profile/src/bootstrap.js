import React from 'react';
import ReactDOM from 'react-dom';
import ProfileApp from "./components/ProfileApp";
import {BrowserRouter} from "react-router-dom";
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ProfileApp />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
