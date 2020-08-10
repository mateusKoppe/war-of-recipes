const WebSocket = require('ws');
const express = require('express');
const cards = require('./cards');
const { v4: uuid } = require('uuid');

const SERVER_PORT = 5000;
const WS_PORT = 8080;

const wss = new WebSocket.Server({ port: WS_PORT });
const app = express()

let games = {};

const DECK_SIZE = 20;
const HAND_INITIAL_SIZE = 4;
const MANA_LIMIT = 10;

function generateDeck() {
  const deck = [];
  for (let i = 0; i < DECK_SIZE; i++) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    deck.push({ ...card, id: uuid() });
  }
  return deck;
}

const BATTLE_PLAYERS = {
  PLAYER: "player",
  ADVERSARY: "adversary",
};

const BATTLE_ROUND_STEP = {
  MAIN: "main",
  BATTLE: "battle",
  DEFENSE: "defense",
  END_BATTLE: "end_battle",
  ENDING: "ending",
};

const playerStateModel = {
  arena: [],
  board: [],
  deck: [],
  hand: [],
  hp: 20,
  mana: {
    maximum: 1,
    actual: 1,
  },
};

const initialState = {
  key: null,
  round: 1,
  roundStep: BATTLE_ROUND_STEP.MAIN,
  attackingPlayer: BATTLE_PLAYERS.PLAYER,
  players: {
    [BATTLE_PLAYERS.PLAYER]: {
      ...playerStateModel,
      key: BATTLE_PLAYERS.PLAYER,
    },
    [BATTLE_PLAYERS.ADVERSARY]: {
      ...playerStateModel,
      key: BATTLE_PLAYERS.ADVERSARY,
    },
  },
};

 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const action = JSON.parse(message)
    const { type } = action;
    switch (type) {
      case 'startBattle':
        const battleKey = uuid();
        games[battleKey] = {...initialState}
        games[battleKey].key = battleKey;
        games[battleKey].players[BATTLE_PLAYERS.PLAYER].deck = generateDeck()
        games[battleKey].players[BATTLE_PLAYERS.ADVERSARY].deck = generateDeck()
        ws.send(JSON.stringify({
          type: 'setBattle',
          payload: games[battleKey]
        }));
        break;
    }
    console.log('action', action);
  });
 
  ws.send('something');
});

app.use(express.static('public'));

app.listen(SERVER_PORT, () => console.log(`
SERVER    -> http://localhost:${SERVER_PORT}
WEBSOCKET -> ws://localhost:${WS_PORT}
`))