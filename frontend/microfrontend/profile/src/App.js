import React from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import '../blocks/profile/profile.css';

function App({ onUpdateAvatar, onUpdateUser, currentUser }) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }

    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    return (
        <>
            <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            <EditProfilePopup
                currentUser={currentUser}
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={(props) => { closeAllPopups(); if (typeof onUpdateUser === "function") onUpdateUser(props) }}
                onClose={closeAllPopups}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={(props) => { closeAllPopups(); if (typeof onUpdateAvatar === "function") onUpdateAvatar(props) }}
                onClose={closeAllPopups}
            />
        </>
    )
}

export default App;