import { useState } from "react";
import api from "../utils/api";

export function useEditProfilePopupState() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    function openEditProfilePopup() {
        setIsEditProfilePopupOpen(true);
    }

    function closeEditProfilePopup() {
        setIsEditProfilePopupOpen(false);
    }

    return {
        isEditProfilePopupOpen,
        openEditProfilePopup,
        closeEditProfilePopup
    };
}

export function handleUpdateUser(userUpdate, setCurrentUser) {
    api
        .setUserInfo(userUpdate)
        .then((newUserData) => {
            setCurrentUser(newUserData);
        })
        .catch((err) => console.log(err));
}