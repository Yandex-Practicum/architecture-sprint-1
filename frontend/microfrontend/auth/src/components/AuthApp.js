import Login from "./Login";
import React, {useState} from "react";
import {Redirect, Route, Router, Switch, useHistory} from "react-router-dom";

import '../index.css';
import Register from "./Register";
import useRegisterLogic from "./registerLogic";
import useLoginLogic from "./loginLogic";
import useAuthEffect from "./useAuthEffect";


function App() {
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const history = useHistory();

    const handleRegister = useRegisterLogic(setTooltipStatus, setIsInfoToolTipOpen, history);
    const handleLogin = useLoginLogic(setIsLoggedIn, setEmail, setTooltipStatus, setIsInfoToolTipOpen, history);

    useAuthEffect(setEmail, setIsLoggedIn, history);

    return (
            <div>
                <Switch>
                    <Route path="/signup">
                        <Register onRegister={handleRegister} />
                    </Route>
                    <Route path="/signin">
                        <Login onLogin={handleLogin} />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/signin" />
                    </Route>
                </Switch>
            </div>
    );
}

export default App;