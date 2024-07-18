import { useState } from "react";
import api from "../utils/api";

export function useEditAvatarPopupState() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    function openEditAvatarPopup() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeEditAvatarPopup() {
        setIsEditAvatarPopupOpen(false);
    }

    return {
        isEditAvatarPopupOpen,
        openEditAvatarPopup,
        closeEditAvatarPopup
    };
}

export function handleUpdateAvatar(avatarUpdate, setCurrentUser) {
    api
        .setUserAvatar(avatarUpdate)
        .then((newUserData) => {
            setCurrentUser(newUserData);
        })
        .catch((err) => console.log(err));
}