import React from "react";
import '../index.css';
import {CurrentUserContext} from 'microfrontend_shared-lib';
import AddPlacePopup from "./AddPlacePopup";
import {useAddPlacePopupLogic} from "./addPlacePopupLogic";
import {useImagePopupLogic} from "./imagePopupLogic";
import {useCardsLogic} from "./cardLogic";
import ImagePopup from "./ImagePopup";


function CardsApp() {

    const {
        isAddPlacePopupOpen,
        closeAddPlacePopup,
        openAddPlacePopup,
        addPlaceSubmit
    } = useAddPlacePopupLogic();

    const {
        selectedCard,
        handleCardClick
    } = useImagePopupLogic();

    const {
        cards,
        setCards,
        handleCardLike,
        handleCardDelete
    } = useCardsLogic();

    const handleAddPlaceSubmit = (newCard) => {
        addPlaceSubmit(newCard, cards, setCards);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onAddPlace={handleAddPlaceSubmit}
                    onClose={closeAddPlacePopup}
                />
            </div>
            <ImagePopup card={selectedCard} onClose={closeAddPlacePopup} />
        </CurrentUserContext.Provider>
    );
}

export default CardsApp;