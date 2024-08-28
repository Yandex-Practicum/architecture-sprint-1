import React from "react";
import Card from "./components/Card";
import api from "../../../src/utils/api";
import './style.css';
import {BrowserRouter, Link, Route} from "react-router-dom";

export default function Root(props) {
  const [cards, setCards] = React.useState([]);
  const [userData, setCurrentUser] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    api
        .getAppInfo()
        .then(([cardData, userData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch((err) => console.log(err));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return <BrowserRouter>
    <Route exact path="/">
      <section className="places page__section">
        {userData?.name}
        <ul className="places__list">
          {cards.map((card) => (
              <Card
                  key={card._id}
                  card={card}
                  onCardClick={() => {
                  }}
                  onCardLike={() => {
                  }}
                  onCardDelete={() => {
                  }}
              />
          ))}
        </ul>
      </section>
    </Route>
  </BrowserRouter>;
}
