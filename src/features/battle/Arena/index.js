import React from "react";

import Token from "../Board/Token";

import ArenaStyles from "./Arena.module.css";

function Arena(props) {
  const { player } = props;
  const { arena } = player;

  return (
    <div className={ArenaStyles.arena}>
      {arena.map((card, index) => (
        <Token
          key={index}
          {...card}
        />
      ))}
    </div>
  );
}

export default Arena;
