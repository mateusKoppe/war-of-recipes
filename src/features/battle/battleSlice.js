import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import cards from "cards";

const DECK_SIZE = 20;
const HAND_INITIAL_SIZE = 4;

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
    increaseRound: (state) => {
      state.round++;
      Object.values(BATTLE_PLAYERS).forEach((player) => {
        state.players[player].mana.maximum++;
        state.players[player].mana.actual = state.players[player].mana.maximum;
      });
    },
    castCard: (state, action) => {
      const { card, player } = action.payload;
      const battlePlayer = state.players[player];
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
  },
});

export const selectPlayer = (player) => (state) => state.battle.players[player];

export const { setupGame, increaseRound, castCard } = battleSlice.actions;

export default battleSlice.reducer;
