import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

const App = () => {

    function handleRegister(props) {
        alert(JSON.stringify(props))
    }

    function handleLogin(props) {
        alert(JSON.stringify(props))
    }

    return (
        <BrowserRouter>
            <Redirect to="./signup" />
            <Route path="/signup">
                <Register onRegister={handleRegister} />
            </Route>
            <Route path="/signin">
                <Login onLogin={handleLogin} />
            </Route>
        </BrowserRouter>
    )
}

export default App;

