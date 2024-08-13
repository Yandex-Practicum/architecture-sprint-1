import React from 'react';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Card from './Card';
import api from '../utils/api';

import '../index.css';

export default function Places({ currentUser, PopupWithForm, className, isAddPlacePopupOpen, setIsAddPlacePopupOpen }) {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClose() {
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        handleClose();
      })
      .catch((err) => console.log(err));
  }

    return (
      <>
        <section className={`places ${className ?? ''}`}>
          <ul className="places__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                currentUser={currentUser}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            ))}
          </ul>
      </section>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={handleClose}
          PopupWithForm={PopupWithForm}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <ImagePopup card={selectedCard} onClose={handleClose} />
      </>
    );
}
