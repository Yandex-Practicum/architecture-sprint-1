import React from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";

function EditAvatarPopup({ isOpen, onUpdateAvatarSuccess, onClose }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    api
      .setUserAvatar({
        avatar: inputRef.current.value,
      })
      .then(onUpdateAvatarSuccess)
      .catch((error) => console.error(error));
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Обновить аватар"
      name="edit-avatar"
    >
      <label className="popup__label">
        <input
          type="url"
          name="avatar"
          id="owner-avatar"
          className="popup__input popup__input_type_description"
          placeholder="Ссылка на изображение"
          required
          ref={inputRef}
        />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
