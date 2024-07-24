import React from "react";
import App from "./components/App"
import { BrowserRouter } from "react-router-dom";

export default function Root(props) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );}
