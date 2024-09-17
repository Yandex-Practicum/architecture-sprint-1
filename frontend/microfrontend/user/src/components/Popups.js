import React, { useEffect } from 'react'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { sendEvent, createListener } from 'shared_shared';
import api from '../utils/api';

export default function Popups() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

    const closeAllPopups = sendEvent('closeAllPopups');
    const setCurrentUser = sendEvent('setCurrentUser');

    function handleUpdateUser(userUpdate) {
      api
        .setUserInfo(userUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
    }

    useEffect(createListener('editProfilePopupOpen', () => setIsEditProfilePopupOpen(true)), []);
    useEffect(createListener('editAvatarPopupOpen', () => setIsEditAvatarPopupOpen(false)));

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return <>
    <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onUpdateUser={handleUpdateUser}
      onClose={closeAllPopups}
    />
    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onUpdateAvatar={handleUpdateAvatar}
      onClose={closeAllPopups}
    />
  </>
}
