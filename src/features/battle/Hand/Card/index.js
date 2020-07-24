import React from "react";

import CardStyles from "./Card.module.css";

function Card(props) {
  const {
    name,
    attack,
    hitPoints,
    manaCost,
    onCastCard,
    canCast,
    ...others
  } = props;

  return (
    <div className={CardStyles.card} {...others}>
      <h3>
        {name} ({manaCost})
      </h3>
      <div>
        <b>Atk:</b> {attack}
        <b>HP:</b> {hitPoints}
      </div>
      <div>
        <button disabled={!canCast} onClick={onCastCard}>
          Cast
        </button>
      </div>
    </div>
  );
}

export default Card;