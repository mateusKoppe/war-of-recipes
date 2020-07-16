import React, { useState } from "react";

import cards from "./cards";
import Card from "components/Card";

function Battle() {
  const [hand, setHand] = useState([]);
  const [cardsInField, setCardsInField] = useState([]);

  const drawCard = () => {
    var card = cards[Math.floor(Math.random() * cards.length)];
    setHand([...hand, { ...card }]);
  };

  const castCard = (card) => {
    setHand(hand.filter((item) => item !== card));
    setCardsInField([...cardsInField, card]);
  };

  return (
    <div>
      <div>
        <h2>Field</h2>
        {cardsInField.map((card) => (
          <Card onCastCard={() => castCard(card)} {...card} />
        ))}
      </div>
      <button onClick={drawCard}>Draw</button>
      <div>
        <h2>Your hand:</h2>
        {hand.map((card) => (
          <Card onCastCard={() => castCard(card)} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Battle;
