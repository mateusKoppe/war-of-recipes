import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Token from "../Board/Token";

import ArenaStyles from "./Arena.module.css";

import { BATTLE_ROUND_STEP } from "features/battle/useBattle";

function Arena(props) {
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

export default Arena;
