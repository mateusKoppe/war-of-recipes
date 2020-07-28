import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Card from "./Card";

import HandStyles from "./Hand.module.css";

import { BATTLE_ROUND_STEP } from "features/battle/useBattle";

function Hand(props) {
  const { player, position, battleHook } = props;
  const { hand } = player;
  const [hoverCard, setHoverCard] = useState(null);

  const { battle } = battleHook;

  const isPlayerRound = battle.attackingPlayer === player.key;

  const getCanCastCard = (card) => {
    const isManaEnough = card.manaCost <= player.mana.actual;
    const isMainStep = battle.roundStep === BATTLE_ROUND_STEP.MAIN;
    return isManaEnough && isMainStep && isPlayerRound;
  };

  const getCardStyle = (card, props = {}) => {
    const style = {};
    const { isDragging } = props;
    const cardIndex = hand.indexOf(card);

    const isTop = position === "top";
    style["transform"] = isTop ? `rotate(180deg) translateY(185px)` : "";
    const cardHoverIndex = hand.indexOf(hoverCard);
    if (cardHoverIndex !== -1) {
      const cardDistance = Math.abs(cardHoverIndex - cardIndex);
      const scale = Math.max(1.2 - cardDistance / 8, 1);
      const translate = Math.max(170 - cardDistance * 15, 0);
      style["transform"] += ` scale(${scale}) translateY(-${translate}px)`;
      style["zIndex"] = hand.length - cardDistance;
    }

    if (isDragging) {
      style["transform"] += ` scale(1.3) translateY(-170px)`;
      style["zIndex"] = hand.length;
    }

    return style;
  };

  return (
    <Droppable droppableId="hand" direction="horizontal">
      {(provided, snapshot) => (
        <div
          className={HandStyles.hand}
          style={
            {backgroundColor: snapshot.isDraggingOver ? 'rgba(0,0,0,.2)' : ''}
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {hand.map((card, index) => (
            <Draggable
              key={card.id}
              draggableId={card.id}
              isDragDisabled={!getCanCastCard(card)}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card
                    style={getCardStyle(card, {
                      isDragging: snapshot.isDragging,
                    })}
                    onMouseEnter={() => setHoverCard(card)}
                    onMouseLeave={() => setHoverCard(null)}
                    key={index}
                    canCast={getCanCastCard(card)}
                    {...card}
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  );
}

export default Hand;
