import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Token from "./Token";

import BoardStyles from "./Board.module.css";

import { BATTLE_ROUND_STEP } from "features/battle/useBattle";

function Board(props) {
  const { player, battleHook } = props;
  const { board } = player;

  const { battle, attackCard } = battleHook;

  const isBattleStep = battle.roundStep === BATTLE_ROUND_STEP.BATTLE;
  const isPlayerRound = battle.attackingPlayer === player.key;
  const canAttack = isPlayerRound && isBattleStep;

  const attack = (card) => {
   
  };

  return (
    <Droppable
      droppableId="board"
      direction="horizontal"
      isDropDisabled={battle.roundStep !== BATTLE_ROUND_STEP.MAIN}
    >
      {(provided, snapshot) => (
        <div
          className={BoardStyles.board}
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "rgba(0,0,0,.2)" : "",
          }}
          {...provided.droppableProps}
        >
          {board.map((card, index) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Token
                    canAttack={canAttack}
                    onAttack={() => attack(card)}
                    {...card}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Board;
