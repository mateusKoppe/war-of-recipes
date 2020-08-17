import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Token from "../Board/Token";

import ArenaStyles from "./Arena.module.css";

import { BATTLE_ROUND_STEP } from "features/battle/useBattle";

function DefendingArena(props) {
  const { player, adversary, battleHook } = props;

  const slots = [...Array(adversary.arena.length).keys()];

  return (
    <div className={ArenaStyles.arena}>
      {slots.map((n) => (
        <Droppable droppableId={`arena-${n}`} direction="horizontal">
          {(provided, snapshot) => (
            <div
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? "rgba(0,0,0,.2)"
                  : "",
                width: 200,
                border: "1px dashed rgba(0, 0, 0, .4)",
              }}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            ></div>
          )}
        </Droppable>
      ))}
    </div>
  );
}

function AttackingArena(props) {
  const { player, battleHook } = props;
  const { arena } = player;
  const { battle } = battleHook;

  return (
    <Droppable
      droppableId="arena"
      direction="horizontal"
      isDropDisabled={battle.roundStep !== BATTLE_ROUND_STEP.BATTLE}
    >
      {(provided, snapshot) => (
        <div
          className={ArenaStyles.arena}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "rgba(0,0,0,.2)" : "",
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {arena.map((card, index) => (
            <Token key={index} {...card} />
          ))}
        </div>
      )}
    </Droppable>
  );
}

function Arena(props) {
  const { player, battleHook } = props;
  const { battle } = battleHook;

  const isPlayerRound = battle.attackingPlayer === player.key;

  return isPlayerRound ? (
    <AttackingArena {...props} />
  ) : (
    <DefendingArena {...props} />
  );
}

export default Arena;
