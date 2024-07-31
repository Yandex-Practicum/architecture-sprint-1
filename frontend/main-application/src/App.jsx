import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"

import "./index.css";
const Button = React.lazy(() => import("auth_microfrontend/Button"))
const Counter = React.lazy(() => import("auth_microfrontend/Counter"))
const Login = React.lazy(() => import("auth_microfrontend/Login"))
const Register = React.lazy(() => import("auth_microfrontend/Register"))

const App = () => (
  <div className="container">
      <Counter/>
      <Login />
      <Button buttonName={"click me"} />
      <Register />
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
    <BrowserRouter><App /></BrowserRouter>
)