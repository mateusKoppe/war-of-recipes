import DeTomator from "assets/img/cards/dtomator.png";
import Ninjita from "assets/img/cards/ninjita.png";
import Broc from "assets/img/cards/broc.png";
import Snana from "assets/img/cards/snana.png";
import LoveApple from "assets/img/cards/love-apple.png";
import Beguetti from "assets/img/cards/beguetti.png";

const cards = [
  {
    name: "DeTomator",
    image: DeTomator,
    description: "Death: Cause 1 damage to all units in battle",
    attack: 1,
    hitPoints: 2,
    manaCost: 2,
  },
  {
    name: "Ninjita",
    image: Ninjita,
    description: "Gain +1/+1 for all ninjitas in battle",
    attack: 1,
    hitPoints: 1,
    manaCost: 1,
  },
  {
    name: "Broc",
    image: Broc,
    description: "Gain +1/+1 for each enemy it has killed",
    attack: 1,
    hitPoints: 1,
    manaCost: 2,
  },
  {
    name: "Snana",
    image: Snana,
    description: "Death touch",
    attack: 1,
    hitPoints: 1,
    manaCost: 2,
  },
  {
    name: "Love Apple",
    image: LoveApple,
    description: "Play: Draw a card in the enemy's deck",
    attack: 1,
    hitPoints: 3,
    manaCost: 3
  },
  {
    name: "Beguetti",
    image: Beguetti,
    description: "Attack: Stun a enemy card",
    attack: 3,
    hitPoints: 2,
    manaCost: 4
  }
  // {
  //   name: "Little Apple",
  //   image: "sssnana.png",
  //   description: "",
  //   attack: 1,
  //   hitPoints: 2,
  //   manaCost: 1,
  // },
  // {
  //   name: "Bad orange",
  //   image: "sssnana.png",
  //   description: "",
  //   attack: 2,
  //   hitPoints: 1,
  //   manaCost: 1,
  // },
  // {
  //   name: "Banana Hydra",
  //   image: "sssnana.png",
  //   description: "",
  //   attack: 2,
  //   hitPoints: 2,
  //   manaCost: 2,
  // },
  // {
  //   name: "Garlic Queen",
  //   image: "sssnana.png",
  //   description: "When cast summon 1 Garlic Soldiers",
  //   attack: 0,
  //   hitPoints: 1,
  //   manaCost: 2,
  // },
  // {
  //   name: "dTomator",
  //   image: "sssnana.png",
  //   description: "",
  //   attack: 3,
  //   hitPoints: 2,
  //   manaCost: 3,
  // },
  // {
  //   name: "Pizzanator",
  //   image: "sssnana.png",
  //   description: "",
  //   attack: 2,
  //   hitPoints: 5,
  //   manaCost: 3,
  // },
  // {
  //   name: "Chocolate mutant ninja turtle",
  //   image: "sssnana.png",
  //   description: "",
  //   attack: 5,
  //   hitPoints: 2,
  //   manaCost: 4,
  // },
];

export default cards;
