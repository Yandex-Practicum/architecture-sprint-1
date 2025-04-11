import React from "react";

import '../blocks/auth-form/auth-form.css';

import Login from "./Login";
import Register from "./Register";

export default function Auth({state}){
    return <>{state === 'Login' ? <Login/> : <Register/>}</>
}