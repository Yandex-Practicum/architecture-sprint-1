import * as auth from "../utils/auth.js";

function useRegisterLogic(setTooltipStatus, setIsInfoToolTipOpen, history) {
    const handleRegister = ({ email, password }) => {
        auth
            .register(email, password)
            .then((res) => {
                setTooltipStatus("success");
                setIsInfoToolTipOpen(true);
                history.push("/signin");
            })
            .catch((err) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    };

    return handleRegister;
}

export default useRegisterLogic;