import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from "../utils/profileApi";

function EditProfilePopup({ currentUser, isOpen, handleUpdateUserSuccess, onClose }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    api
      .setUserInfo({
        name,
        about: description,
      })
      .then(handleUpdateUserSuccess)
      .catch((error) => console.error(error));
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Редактировать профиль" name="edit"
    >
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
          className="popup__input popup__input_type_name" placeholder="Имя"
          required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
          value={name || ''} onChange={handleNameChange} />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
          className="popup__input popup__input_type_description" placeholder="Занятие"
          required minLength="2" maxLength="200"
          value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
