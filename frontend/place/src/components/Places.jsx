import React, {useEffect} from 'react';

import '../blocks/index.css';
import api from "../utils/api";
import Card from "./Card";
import PlaceImagePopup from "./PlaceImagePopup";
import AddPlacePopup from "./AddPlacePopup";


export default function Places({currentUser, PopupWithForm}){
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    React.useEffect(() => {
        api
            .getCardList()
            .then((cardData) => {
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    function onCardClick(card){
        setSelectedCard(card);
    }
    function onClosePopups(){
        setSelectedCard(null)
        setIsAddPlacePopupOpen(false)
    }

    function onCardLike(card){
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
    function onCardDelete(card){
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
                onClosePopups()
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlacePopupOpen(){
        setIsAddPlacePopupOpen(true)
    }

    useEffect(() => {
        addEventListener("add-new-place", handleAddPlacePopupOpen);

        return () => {
            removeEventListener("add-new-place", handleAddPlacePopupOpen);
        }
    }, []);

    return (
        <>
            <section className="places page__section">
                <ul className="places__list">
                    {cards.map((card) => (
                      <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        currentUser={currentUser}
                      />
                    ))}
                </ul>
            </section>

            <PlaceImagePopup  card={selectedCard} onClose={onClosePopups} />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onAddPlace={handleAddPlaceSubmit}
                onClose={onClosePopups}
                PopupWithForm={PopupWithForm}
            />
        </>
    )
}