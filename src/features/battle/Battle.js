import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "components/Card";

import { selectPlayer, selectBattle, setupGame, castCard, BATTLE_PLAYERS, nextRound } from "./battleSlice";

function Battle() {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer(BATTLE_PLAYERS.PLAYER))
  // const adversary = useSelector(selectPlayer(BATTLE_PLAYERS.ADVERSARY))
  const battle = useSelector(selectBattle)

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
          <Card inField key={index} {...card} />
        ))}
      </div>
      <button onClick={() => dispatch(nextRound())}>Next turn</button>
      <div>
        <h2>Your hand ({player.mana.actual}/{player.mana.maximum}):</h2>
        {player.hand.map((card, index) => (
          <Card key={index} canCast={card.manaCost <= player.mana.actual} onCastCard={() => cast(card)} {...card} />
        ))}
      </div>
      <div>
        Round: {battle.round} <br/>
        AttackingPlayer: {battle.attackingPlayer}
      </div>
    </div>
  );
}

export default Battle;
