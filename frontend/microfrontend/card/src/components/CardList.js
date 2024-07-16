import React from 'react';
import Card from "./Card";
import '../blocks/places/places.css'

function CardList({ cards, currentUser, onCardClick, onCardLike, onCardDelete }) {

    return (
        <div className="places">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        currentUser={currentUser}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </ul>
        </div>
    );
}


export default CardList;