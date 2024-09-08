import React, {useEffect, useState} from "react";

import EditAvatarPopup from "../EditAvatarPopup";
import EditProfilePopup from "../EditProfilePopup";

import api from "../../utils/api";

import './profile/profile.css';
export default function Profile({children}) {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        useState(false);
    const [currentUser, setCurrentUser] = useState({});

    const getUser = () => {
        api.getUserInfo()
            .then(res => setCurrentUser(res))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getUser()
    }, []);

    const imageStyle = { backgroundImage: `url(${currentUser?.avatar ?? null})` };
    const onEditAvatar = () => setIsEditAvatarPopupOpen(true);
    const onEditProfile = () => setIsEditProfilePopupOpen(true);
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
    }

    const handleUpdateAvatar = ({avatar}) => {
        api.setUserAvatar({ avatar })
            .then((res) => setCurrentUser(res))
            .finally(() => {
                closeAllPopups();
            })
    }

    const handleUpdateUser = ({name, about}) => {
        api.setUserInfo({name, about})
            .then((res) => setCurrentUser(res))
            .finally(() => {
                closeAllPopups();
            })

    }

    return <>
        <section className="profile page__section">
            <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            {children}
        </section>
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
        />
        <EditProfilePopup
            currentUser={currentUser}
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
        />
    </>
}