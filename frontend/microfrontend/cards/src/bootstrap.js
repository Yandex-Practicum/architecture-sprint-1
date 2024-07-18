import React from 'react';
import ReactDOM from 'react-dom';
import CardsApp from "./components/CardsApp";
import {BrowserRouter} from "react-router-dom";
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <CardsApp />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
