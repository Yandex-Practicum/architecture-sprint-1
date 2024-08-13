import React from 'react';
import { Route, useHistory, Switch } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

import '../index.css';

export default function Auth({ setUser }) {
  const history = useHistory();
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setUser({ loggedIn: true, email: res.data.email });
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history, setUser]);

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setTooltipStatus('success');
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch(() => {
        setTooltipStatus('fail');
        setIsInfoToolTipOpen(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then(() => {
        setUser({ loggedIn: true, email });
        history.push("/");
      })
      .catch(() => {
        setTooltipStatus('fail');
        setIsInfoToolTipOpen(true);
      });
  }

  function handleClose() {
    setIsInfoToolTipOpen(false);
  }

    return (
      <>
        <Switch>
            <Route path="/signup">
                <Register onRegister={onRegister} />
            </Route>
            <Route path="/signin">
                <Login onLogin={onLogin} />
            </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={handleClose}
          status={tooltipStatus}
        />
      </>
    );
}
