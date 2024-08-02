import React from "react";
import ReactDOM from "react-dom/client";
import { observer } from "mobx-react-lite";

import "./index.css";
import globalStore from "./GlobalStore";

const App = observer(() => {
    const updateUser = () => {
        globalStore.setCurrentUser({ name: "Jane Smith", age: 25 });
    };

    return (
        <div className="container">
            <div>Name: {globalStore.currentUser.name}</div>
            <div>Age: {globalStore.currentUser.age}</div>
            <button onClick={updateUser}>Update User</button>
        </div>
    );
});

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);