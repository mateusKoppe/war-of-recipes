import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "components/Card";
import Hand from "./Hand"

import BattleStyle from "./Battle.module.css";

import { selectPlayer, selectBattle, setupGame, BATTLE_PLAYERS, nextRound } from "./battleSlice";

function Battle() {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer(BATTLE_PLAYERS.PLAYER))
  // const adversary = useSelector(selectPlayer(BATTLE_PLAYERS.ADVERSARY))
  const battle = useSelector(selectBattle)

  useEffect(() => {
    dispatch(setupGame())
  }, [dispatch])

  return (
    <div className={BattleStyle.battle}>
      <div>
        <div>
          Round: {battle.round} <br />
          Player: ({player.mana.actual}/{player.mana.maximum})
          AttackingPlayer: {battle.attackingPlayer}
          <button onClick={() => dispatch(nextRound())}>Next turn</button>
        </div>
      </div>
      <div>
        <h2>Field</h2>
        <div style={{display: "flex"}}>
          {player.board.map((card, index) => (
            <Card inField key={index} {...card} />
          ))}
        </div>
      </div>
      <Hand player={player} />
    </div>
  );
}

export default Battle;
