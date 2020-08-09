import React from "react";

import TokenStyles from "./Token.module.css";
import TokenTemplate from "assets/img/token-template.png";

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
