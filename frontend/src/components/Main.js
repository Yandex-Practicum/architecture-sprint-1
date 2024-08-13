import React from 'react';

import Profile from "profile/Profile";
import Places from "places/Places";

import PopupWithForm from "./PopupWithForm";

function Main({ currentUser, setCurrentUser }) {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  return (
    <main className="content">

      <Profile
        setCurrentUser={setCurrentUser}
        PopupWithForm={PopupWithForm}
        onAddPlace={handleAddPlaceClick}
        className="page__section"
      />

      <Places
        currentUser={currentUser}
        PopupWithForm={PopupWithForm}
        className="page__section"
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        setIsAddPlacePopupOpen={setIsAddPlacePopupOpen}
      />

    </main>
  );
}

export default Main;
