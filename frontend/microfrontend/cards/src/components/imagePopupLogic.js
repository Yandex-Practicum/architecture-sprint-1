import React from 'react';

export function useImagePopupLogic() {
    const [selectedCard, setSelectedCard] = React.useState(null);

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    return {
        selectedCard,
        handleCardClick
    };
}