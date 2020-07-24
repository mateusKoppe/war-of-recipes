import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Token from "./Token";

import BoardStyles from "./Board.module.css";

import {
  attackCard,
  selectBattle,
  BATTLE_PLAYERS,
  BATTLE_ROUND_STEP,
} from "features/battle/battleSlice";

function Board(props) {
  const { player } = props;
  const { board } = player;

  const dispatch = useDispatch();
  const battle = useSelector(selectBattle);

  const isBattleStep = battle.roundStep === BATTLE_ROUND_STEP.BATTLE;
  const isPlayerRound = battle.attackingPlayer === BATTLE_PLAYERS.PLAYER;
  const canAttack = isPlayerRound && isBattleStep;

  const attack = (card) => {
    dispatch(
      attackCard({
        card,
        player: BATTLE_PLAYERS.PLAYER,
      })
    );
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
