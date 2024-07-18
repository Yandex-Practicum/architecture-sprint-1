import {useEffect} from 'react';
import * as auth from "../utils/auth.js"

function useAuthEffect(setEmail, setIsLoggedIn, history) {
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, [history, setEmail, setIsLoggedIn]);
}

export default useAuthEffect;