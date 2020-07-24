import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Card from "./Card";

import HandStyles from "./Hand.module.css";

import { castCard, BATTLE_PLAYERS } from "features/battle/battleSlice";

function Hand(props) {
  const { player } = props;
  const { hand } = player;
  const [hoverCard, setHoverCard] = useState(null);

  const dispatch = useDispatch();

  const cast = (card) => {
    dispatch(castCard({
      card,
      player: BATTLE_PLAYERS.PLAYER
    }))
  };

  const getCardStyle = (card) => {
    const style = {};
    const cardIndex = hand.indexOf(card)
    
    const cardHoverIndex = hand.indexOf(hoverCard)
    if (cardHoverIndex !== -1) {
      const cardDistance = Math.abs(cardHoverIndex - cardIndex)
      const scale = Math.max(1.2 - cardDistance / 8, 1);
      const translate = Math.max(80 - cardDistance * 15, 0)
      style["transform"] = `scale(${scale}) translateY(-${translate}px)`;
      style["zIndex"] = hand.length - cardDistance
    }

    return style;
  }

  return (
    <div className={HandStyles.hand}>
      {hand.map((card, index) => (
        <Card
          style={getCardStyle(card)}
          onMouseEnter={() => setHoverCard(card)}
          onMouseLeave={() => setHoverCard(null)}
          key={index}
          canCast={card.manaCost <= player.mana.actual}
          onCastCard={() => cast(card)} {...card}
        />
      ))}
    </div>
  )
}

export default Hand;