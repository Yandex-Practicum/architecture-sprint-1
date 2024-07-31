import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
const Button = React.lazy(() => import('auth_microfrontend/Button'))
const Counter = React.lazy(() => import('auth_microfrontend/Counter'))

const App = () => (
  <div className="container">
      <Counter/>
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)