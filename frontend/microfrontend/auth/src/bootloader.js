import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Auth from './components/Auth';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth setUser={console.log} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

export {};
