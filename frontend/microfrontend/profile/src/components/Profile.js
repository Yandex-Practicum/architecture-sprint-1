import React from 'react';
import '../blocks/profile/profile.css';

function Profile({currentUser, onEditAvatar, onEditProfile, onAddPlace, imageStyle}) {

    return (
        <div className="profile">
            <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </div>
    );
}

export default Profile;