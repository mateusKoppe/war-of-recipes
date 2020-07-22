import React from "react";

function Card(props) {
  const {
    name,
    attack,
    hitPoints,
    manaCost,
    onCastCard,
    inField,
    canCast,
  } = props;

  return (
    <div>
      <h3>
        {name} ({manaCost})
      </h3>
      <div>
        <b>Atk:</b> {attack}
        <b>HP:</b> {hitPoints}
      </div>
      {!inField && (
        <div>
          <button disabled={!canCast} onClick={onCastCard}>
            Cast
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
