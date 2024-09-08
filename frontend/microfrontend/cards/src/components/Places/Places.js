import {useEffect, useState} from "react";

import Card from '../Card/Card';

import api from "../../utils/api";

import './places/places.css';
import AddPlacePopup from "../AddPlacePopup";
import ImagePopup from "../ImagePopup";

export default function Places({isOpenAddCard}) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getCardList()
            .then(res => setCards(res))
    }, []);

    return <>
        <section className="places page__section">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                    />
                ))}
            </ul>
        </section>
        <AddPlacePopup />
        <ImagePopup />
    </>
}