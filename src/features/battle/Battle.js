import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Hand from "./Hand";
import Board from "./Board";
import Arena from "./Arena";

import BattleStyle from "./Battle.module.css";

import {
  selectPlayer,
  selectBattle,
  setupGame,
  nextRound,
  setRoundStep,
  BATTLE_PLAYERS,
  BATTLE_ROUND_STEP,
} from "./battleSlice";

function Battle() {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer(BATTLE_PLAYERS.PLAYER));
  const adversary = useSelector(selectPlayer(BATTLE_PLAYERS.ADVERSARY));
  const battle = useSelector(selectBattle);

  useEffect(() => {
    dispatch(setupGame());
  }, [dispatch]);

  return (
    <div className={BattleStyle.battle}>
      <div>
        <div>
          Round: {battle.round} <br />
          Player: ({player.mana.actual}/{player.mana.maximum}) AttackingPlayer:{" "}
          {battle.attackingPlayer}
          <button onClick={() => dispatch(nextRound())}>Next turn</button>
          {
            battle.attackingPlayer === BATTLE_PLAYERS.PLAYER &&
            battle.roundStep === BATTLE_ROUND_STEP.MAIN && (
            <button onClick={() => dispatch(setRoundStep(BATTLE_ROUND_STEP.BATTLE))}>Battle</button>
          )}
        </div>
      </div>
      <Arena player={player} />
      <Board player={player} />
      <Hand player={player} />
    </div>
  );
}

export default Battle;
