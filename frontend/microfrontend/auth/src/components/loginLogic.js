import {useHistory} from 'react-router-dom';
import * as auth from "../utils/auth.js";

function useLoginLogic(setIsLoggedIn, setEmail, setTooltipStatus, setIsInfoToolTipOpen, history) {

    return ({email, password}) => {
        console.log(email, password);
        auth
            .login(email, password)
            .then((res) => {
                setIsLoggedIn(true);
                setEmail(email);
                history.push("/");
            })
            .catch((err) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    };
}

export default useLoginLogic;