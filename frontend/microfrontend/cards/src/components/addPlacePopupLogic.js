import api from "../utils/api";
import React from 'react';

export function useAddPlacePopupLogic() {

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =
        React.useState(false);

    function closeAddPlacePopup() {
        setIsAddPlacePopupOpen(false);
    }

    function openAddPlacePopup() {
        setIsAddPlacePopupOpen(true);
    }

    function addPlaceSubmit(newCard, cards, setCards) {
        api
            .addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                closeAddPlacePopup();
            })
            .catch((err) => console.log(err));
    }

    return {
        isAddPlacePopupOpen,
        closeAddPlacePopup,
        openAddPlacePopup,
        addPlaceSubmit
    };
}