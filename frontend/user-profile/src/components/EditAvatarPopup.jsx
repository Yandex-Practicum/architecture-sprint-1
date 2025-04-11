import React from 'react'
import api from "../utils/api";

export default function EditAvatarPopup({ isOpen, onClose, PopupWithForm }) {
    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        api
            .setUserAvatar({
                avatar: inputRef.current.value,
            })
            .then((newUserData) => {
                dispatchEvent(new CustomEvent("user-update", {
                    detail: {
                        data: newUserData
                    }
                }));
                onClose();
            })
            .catch((err) => console.log(err));
    }

    return (
        <PopupWithForm
            isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Обновить аватар" name="edit-avatar"
        >
            <label className="popup__label">
                <input type="url" name="avatar" id="owner-avatar"
                       className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
                       required ref={inputRef} />
                <span className="popup__error" id="owner-avatar-error"></span>
            </label>
        </PopupWithForm>
    );
}