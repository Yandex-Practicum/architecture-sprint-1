import React, { lazy }  from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const HeaderControl = lazy(() => import('Shared/Header').catch(() => {
  return { default: () => <div className='error'>Header is not available!</div> };
 })); 

 const FooterControl = lazy(() => import('Shared/Footer').catch(() => {
   return { default: () => <div className='error'>Footer is not available!</div> };
  })); 

const App = () => (
  <div className="container">
    <HeaderControl></HeaderControl>
    <FooterControl></FooterControl>
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)