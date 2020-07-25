import React from "react";

import Token from "./Token";

import BoardStyles from "./Board.module.css";

import {
  BATTLE_PLAYERS,
  BATTLE_ROUND_STEP,
} from "features/battle/useBattle";

function Board(props) {
  const { player, battleHook } = props;
  const { board } = player;

  const { battle, attackCard } = battleHook;

  const isBattleStep = battle.roundStep === BATTLE_ROUND_STEP.BATTLE;
  const isPlayerRound = battle.attackingPlayer === BATTLE_PLAYERS.PLAYER;
  const canAttack = isPlayerRound && isBattleStep;

  const attack = (card) => {
    attackCard({
      card,
      player: BATTLE_PLAYERS.PLAYER,
    })
  };

  return (
    <div className={BoardStyles.board}>
      {board.map((card, index) => (
        <Token
          canAttack={canAttack}
          key={index}
          onAttack={() => attack(card)}
          {...card}
        />
      ))}
    </div>
  );
}

export default Board;
