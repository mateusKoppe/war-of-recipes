import React from "react";

import TokenStyles from "./Token.module.css";
import TokenTemplate from "assets/img/card-template.png";

function Token(props) {
  const {
    name,
    attack,
    hitPoints,
    image,
    manaCost,
    onCastToken,
    canCast,
    ...others
  } = props;

  return (
    <div className={TokenStyles.token} {...others}>
      <img
        className={TokenStyles.tokenTemplate}
        src={TokenTemplate}
        alt="Template"
      />
      <div className={TokenStyles.tokenContent}>
        <h3 className={TokenStyles.tokenTitle}>{name}</h3>
        <div className={TokenStyles.tokenMana}>{manaCost}</div>
        <div className={TokenStyles.tokenStats}>
          <div>{attack}</div>
          <div>{hitPoints}</div>
        </div>
        <img className={TokenStyles.tokenImage} src={image} alt="Template" />
      </div>
    </div>
  );
}

export default Token;
