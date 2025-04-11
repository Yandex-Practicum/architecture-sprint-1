import React from 'react';

import '../blocks/profile/profile.css';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";


export default function UserProfile({currentUser, RBlock, PopupWithForm }){
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    if (!currentUser?._id){
        return <div>Not user</div>
    }

    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    return (
        <>
            <section className="profile page__section">
                <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <RBlock/>
            </section>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                PopupWithForm={PopupWithForm}
                currentUser={currentUser}
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                PopupWithForm={PopupWithForm}
                currentUser={currentUser}
            />
        </>
    )
}