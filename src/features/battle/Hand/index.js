import React from "react";
import { useDispatch } from "react-redux";

import Card from "components/Card";

import HandStyles from "./Hand.module.css";

import { castCard, BATTLE_PLAYERS } from "features/battle/battleSlice";

function Hand(props) {
  const { player } = props;
  const { hand } = player;

  const dispatch = useDispatch();

  const cast = (card) => {
    dispatch(castCard({
      card,
      player: BATTLE_PLAYERS.PLAYER
    }))
  };

  return (
    <div className={HandStyles.hand}>
      {hand.map((card, index) => (
        <Card
          key={index}
          canCast={card.manaCost <= player.mana.actual}
          onCastCard={() => cast(card)} {...card}
        />
      ))}
    </div>
  )
}

export default Hand;