import React from 'react';
import Card from './components/Card'
import AddPlacePopup from './components/AddPlacePopup';

const App = () => {
    const [cards, setCards] = React.useState([]);

    function handleCardLike(like) {
        setCards(prev => prev.map(card => ({ ...card, likes: like._id === card._id ? card.likes.length > 0 ? [] : [{ _id: 1 }] : card.likes })))
    }

    function handleCardDelete(card) {
        setCards(prev => prev.filter(current => current._id !== card._id))
    }

    function handleAddPlace(props) {
        setCards(prev => [{ ...props, _id: Date.now(), likes: [], owner: { _id: 1 } }, ...prev])
    }

    return (
        <>
            <AddPlacePopup onAddPlace={handleAddPlace} />
            <Card
                cards={cards}
                currentUser={{ _id: 1 }}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
        </>
    )
}

export default App;

