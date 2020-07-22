import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import cards from "cards";

const DECK_SIZE = 20;
const HAND_INITIAL_SIZE = 4;
const MANA_LIMIT = 10;

const playerStateModel = {
  board: [],
  deck: [],
  hand: [],
  hp: 20,
  mana: {
    maximum: 0,
    actual: 0,
  },
};

function generateDeck() {
  const deck = [];
  for (let i = 0; i < DECK_SIZE; i++) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    deck.push({ ...card, id: uuid() });
  }
  return deck;
}

export const BATTLE_PLAYERS = {
  PLAYER: "player",
  ADVERSARY: "adversary",
};

export const battleSlice = createSlice({
  name: "battle",
  initialState: {
    round: 0,
    attackingPlayer: BATTLE_PLAYERS.PLAYER,
    players: {
      [BATTLE_PLAYERS.PLAYER]: { ...playerStateModel },
      [BATTLE_PLAYERS.ADVERSARY]: { ...playerStateModel },
    },
  },
  reducers: {
    castCard: (state, action) => {
      const { card, player } = action.payload;
      const battlePlayer = state.players[player];
      battlePlayer.mana.actual -= card.manaCost;
      const cardIndex = battlePlayer.hand.findIndex((c) => c.id === card.id);
      battlePlayer.hand.splice(cardIndex, 1);
      battlePlayer.board.push(card);
      state.players[player] = battlePlayer;
    },
    setupGame: (state) => {
      Object.values(BATTLE_PLAYERS).forEach((player) => {
        const deck = generateDeck();
        for (let i = 0; i < HAND_INITIAL_SIZE; i++) {
          state.players[player].hand.push(deck.pop());
        }
        state.players[player].deck = deck;
      });
    },
    nextRound: (state) => {
      let nextPlayer;
      switch (state.attackingPlayer) {
        case BATTLE_PLAYERS.PLAYER:
          nextPlayer = BATTLE_PLAYERS.ADVERSARY;
          break;
        case BATTLE_PLAYERS.ADVERSARY:
          nextPlayer = BATTLE_PLAYERS.PLAYER;
          break;
        default:
          nextPlayer = BATTLE_PLAYERS.PLAYER;
      }
      state.attackingPlayer = nextPlayer;
      state.round++;
      Object.values(BATTLE_PLAYERS).forEach((playerKey) => {
        const player = state.players[playerKey];
        player.mana.maximum =
          player.mana.maximum < MANA_LIMIT
            ? player.mana.maximum + 1
            : MANA_LIMIT;
        player.mana.actual = player.mana.maximum;
      });
    },
  },
});

export const selectPlayer = (player) => (state) => state.battle.players[player];
export const selectBattle = (state) => state.battle;

export const { setupGame, nextRound, castCard } = battleSlice.actions;

export default battleSlice.reducer;
