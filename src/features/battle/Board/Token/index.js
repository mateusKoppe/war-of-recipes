import React from "react";

import TokenStyles from "./Token.module.css";

function Token(props) {
  const {
    name,
    attack,
    hitPoints,
    manaCost,
    onAttack,
    canAttack,
    ...others
  } = props;

  return (
    <div className={TokenStyles.token} {...others}>
      <h3>{name}</h3>
      <div>
        <b>Atk:</b> {attack}
        <b>HP:</b> {hitPoints}
      </div>
      <div>{canAttack && <button onClick={onAttack}>Attack</button>}</div>
    </div>
  );
}

export default Token;
