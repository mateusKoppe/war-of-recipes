import React from "react";

import CardStyles from "./Card.module.css";
import CardTemplate from "assets/img/card-template.png";

function Card(props) {
  const {
    name,
    attack,
    hitPoints,
    description,
    image,
    manaCost,
    onCastCard,
    canCast,
    ...others
  } = props;

  return (
    <div className={CardStyles.card} {...others}>
      <img
        className={CardStyles.cardTemplate}
        src={CardTemplate}
        alt="Template"
      />
      <div className={CardStyles.cardContent}>
        <h3 className={CardStyles.cardTitle}>{name}</h3>
        <div className={CardStyles.cardMana}>{manaCost}</div>
        <div className={CardStyles.cardStats}>
          <div>{attack}</div>
          <div>{hitPoints}</div>
        </div>
        <div className={CardStyles.cardDescription}>
          <div>{description}</div>
        </div>
        <img className={CardStyles.cardImage} src={image} alt="Template" />
      </div>
    </div>
  );
}

export default Card;
