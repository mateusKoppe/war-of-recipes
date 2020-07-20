import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "components/Card";

import { selectPlayer, setupGame, castCard, BATTLE_PLAYERS } from "./battleSlice";

function Battle() {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer(BATTLE_PLAYERS.PLAYER))
  // const adversary = useSelector(selectPlayer(BATTLE_PLAYERS.ADVERSARY))

  useEffect(() => {
    dispatch(setupGame())
  }, [dispatch])

  const cast = (card) => {
    dispatch(castCard({
      card,
      player: BATTLE_PLAYERS.PLAYER
    }))
  };

  return (
    <div>
      <div>
        <h2>Field</h2>
        {player.board.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <button>Draw</button>
      <div>
        <h2>Your hand:</h2>
        {player.hand.map((card, index) => (
          <Card key={index} onCastCard={() => cast(card)} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Battle;
