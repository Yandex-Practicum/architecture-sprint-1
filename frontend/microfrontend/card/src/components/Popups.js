import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import { sendEvent, createListener } from 'shared_shared';

export default function Popups() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const closeAllPopups = sendEvent('closeAllPopups');
    useEffect(createListener('selectedCard', setSelectedCard), []);
    useEffect(createListener('openAddPlacePopup', () => setIsAddPlacePopupOpen(true)), []);
    useEffect(createListener('closeAllPopups', () => setIsAddPlacePopupOpen(false)));
    const updateCards = sendEvent('updateCards');

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then(() => {
                updateCards();
                closeAllPopups()
            })
            .catch((err) => console.log(err));
    }

    return (<>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
        />
    </>)
}
