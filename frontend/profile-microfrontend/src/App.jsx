import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import EditAvatarPopup from "./components/EditAvatarPopup";

const App = () => (
  <div className="container">
    <EditAvatarPopup />
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)