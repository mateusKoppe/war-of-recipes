import React from "react";

import Hand from "./Hand";
import Board from "./Board";
import Arena from "./Arena";

import BattleStyle from "./Battle.module.css";
import useBattle, { BATTLE_PLAYERS, BATTLE_ROUND_STEP } from "./useBattle";

function Battle() {
  const battleHook = useBattle();
  const { battle, nextRound, setRoundStep } = battleHook
  const { players } = battle;
  const {
    [BATTLE_PLAYERS.PLAYER]: player,
    // [BATTLE_PLAYERS.ADVERSARY]: adversary,
  } = players;

  return (
    <div className={BattleStyle.battle}>
      <div>
        <div>
          Round: {battle.round} <br />
          Player: ({player.mana.actual}/{player.mana.maximum}) AttackingPlayer:{" "}
          {battle.attackingPlayer}
          <button onClick={nextRound}>Next turn</button>
          {
            battle.attackingPlayer === BATTLE_PLAYERS.PLAYER &&
            battle.roundStep === BATTLE_ROUND_STEP.MAIN && (
            <button onClick={() => setRoundStep(BATTLE_ROUND_STEP.BATTLE)}>Battle</button>
          )}
        </div>
      </div>
      <Arena player={player} battleHook={battleHook}/>
      <Board player={player} battleHook={battleHook}/>
      <Hand player={player} battleHook={battleHook}/>
    </div>
  );
}

export default Battle;
