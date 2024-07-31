import React from "react";
import ReactDOM from "react-dom/client";
import Button from "./Button";
import Counter from "./Counter";


const App = () => (
    <div><Counter /></div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)