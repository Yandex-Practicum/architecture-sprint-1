import React from "react";
import '../index.css';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import {CurrentUserContext} from 'microfrontend_shared-lib';
import {handleUpdateUser, useEditProfilePopupState} from "./editProfilePopupLogic";
import {handleUpdateAvatar, useEditAvatarPopupState} from "./editAvatarPopupLogic";

function ProfileApp() {

    const [currentUser, setCurrentUser] = React.useState({});

    const {
        isEditAvatarPopupOpen,
        openEditAvatarPopup,
        closeEditAvatarPopup,
    } = useEditAvatarPopupState();
    const handleUpdateAvatarFn = (avatarUpdate) => handleUpdateAvatar(avatarUpdate, setCurrentUser);

    const {
        isEditProfilePopupOpen,
        openEditProfilePopup,
        closeEditProfilePopup,
    } = useEditProfilePopupState(); // Вызов функции
    const handleUpdateUserFn = (userUpdate) => handleUpdateUser(userUpdate, setCurrentUser);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <button onClick={openEditAvatarPopup}>Редактировать аватар</button>
                <button onClick={openEditProfilePopup}>Редактировать профиль</button>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeEditAvatarPopup}
                    onUpdateAvatar={handleUpdateAvatarFn}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeEditProfilePopup}
                    onUpdateUser={handleUpdateUserFn}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default ProfileApp;