import React from 'react';
import Card from './Card';

function Main({ cards, onCardClick, onCardLike, onCardDelete }) {
  return (
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
  );
}

export default Main;
