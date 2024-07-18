import React from 'react';
import api from "../utils/api";
import {CurrentUserContext} from 'microfrontend_shared-lib';

export function useCardsLogic() {

    const [cards, setCards] = React.useState([]);
    const currentUser = React.useContext(CurrentUserContext);

    function handleCardLike(card) {

        if (!currentUser || !currentUser._id) {
            console.error("Current user is not defined or missing _id");
            console.log(currentUser)
            return;
        }

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

    return {
        cards,
        setCards,
        handleCardLike,
        handleCardDelete
    };
}