import React from "react";
import Card from "./Card";
import postApi from "../utils/postApi";

function PostsFeed({
  currentUser,
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  handleCardLikeSuccess,
  handleCardDeleteSuccess,
}) {
  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log("isLiked", card, isLiked, currentUser._id);
    postApi
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const result = cards.map((c) => (c._id === card._id ? newCard : c));
        console.log("result", result);
        handleCardLikeSuccess(result);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    postApi
      .removeCard(card._id)
      .then(() => {
        const result = cards.filter((c) => c._id !== card._id);
        handleCardDeleteSuccess(result);
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div
          className="profile__image"
          onClick={onEditAvatar}
          style={imageStyle}
        ></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              currentUser={currentUser}
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default PostsFeed;
