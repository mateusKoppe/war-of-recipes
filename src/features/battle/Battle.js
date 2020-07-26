import React from "react";

import Hand from "./Hand";
import Board from "./Board";
import Arena from "./Arena";

import BattleStyle from "./Battle.module.css";
import useBattle, { BATTLE_PLAYERS, BATTLE_ROUND_STEP } from "./useBattle";

function Battle() {
  const battleHook = useBattle();
  const { battle, nextRound, setRoundStep } = battleHook;
  const { players } = battle;
  const {
    [BATTLE_PLAYERS.PLAYER]: player,
    [BATTLE_PLAYERS.ADVERSARY]: adversary,
  } = players;

  return (
    <div className={BattleStyle.battle}>
      <div className={BattleStyle.combat}>
        <Hand player={adversary} position="top" battleHook={battleHook} />
        <Board player={adversary} battleHook={battleHook} />
        <Arena player={adversary} battleHook={battleHook} />
        <Arena player={player} battleHook={battleHook} />
        <Board player={player} battleHook={battleHook} />
        <Hand player={player} position="bottom" battleHook={battleHook} />
      </div>
      <div className={BattleStyle.stats}>
        <div>
          Mana: ({adversary.mana.actual}/{adversary.mana.maximum}) <br />
          Hp: {adversary.hp}
        </div>
        <div>
          Round: {battle.round} <br />
          {battle.attackingPlayer}
          <button onClick={nextRound}>Next turn</button>
          {battle.roundStep === BATTLE_ROUND_STEP.MAIN && (
            <button onClick={() => setRoundStep(BATTLE_ROUND_STEP.BATTLE)}>
              Battle
            </button>
          )}
        </div>
        <div>
          Mana: ({player.mana.actual}/{player.mana.maximum}) <br />
          Hp: {player.hp}
        </div>
      </div>
    </div>
  );
}

export default Battle;
