import React from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';

import '../index.css';

export default function Profile({ setCurrentUser, PopupWithForm, className, onAddPlace }) {
    const [user, setUser] = React.useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
      React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
      React.useState(false);

    function handleClose() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }

    React.useEffect(() => {
        api
          .getUserInfo()
          .then((userData) => {
            setUser(userData);
            setCurrentUser(userData);
          })
          .catch((err) => console.log(err));
      }, [setCurrentUser]);

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setUser(newUserData);
                setCurrentUser(newUserData);
                handleClose();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setUser(newUserData);
                setCurrentUser(newUserData);
                handleClose();
            })
            .catch((err) => console.log(err));
    }

    const imageStyle = { backgroundImage: `url(${user.avatar})` };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    return (
      <>
        <section className={`profile ${className ?? ''}`}>
            <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{user.name}</h1>
                <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                <p className="profile__description">{user.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={handleClose}
          PopupWithForm={PopupWithForm}
          currentUser={user}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={handleClose}
          PopupWithForm={PopupWithForm}
        />
      </>
    );
}
