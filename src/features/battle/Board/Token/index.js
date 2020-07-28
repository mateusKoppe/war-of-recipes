import React from "react";

import TokenStyles from "./Token.module.css";
import TokenTemplate from "assets/img/token-template.png";

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
    </div>
  );
}

export default Token;
