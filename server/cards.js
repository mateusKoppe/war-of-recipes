const DeTomator = "http://localhost:5000/img/cards/dtomator.png";
const Ninjita = "http://localhost:5000/img/cards/ninjita.png";
const Broc = "http://localhost:5000/img/cards/broc.png";
const Snana = "http://localhost:5000/img/cards/snana.png";
const LoveApple = "http://localhost:5000/img/cards/love-apple.png";
const Beguetti = "http://localhost:5000/img/cards/beguetti.png";
const Guacallitor = "http://localhost:5000/img/cards/guacallitor.png";

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
  },
  {
    name: "Guacallitor",
    image: Guacallitor,
    description: "Attack: Stun the enemy for the next turn",
    attack: 4,
    hitPoints: 3,
    manaCost: 4
  }
];

module.exports = cards;
