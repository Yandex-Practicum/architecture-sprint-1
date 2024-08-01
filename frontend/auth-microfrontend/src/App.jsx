import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Counter from "./components/Counter";
import Button from "./components/Button";
import InfoTooltip from "./components/InfoTooltip";

const App = () => (
    <div>
        <Register />
        <Counter />
        <Button buttonName={"click me!"}/>
        <InfoTooltip />
    </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
    <BrowserRouter><App /></BrowserRouter>
)