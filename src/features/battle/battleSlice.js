import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import cards from "cards";

const DECK_SIZE = 20;
const HAND_INITIAL_SIZE = 4;
const MANA_LIMIT = 10;

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

export const BATTLE_ROUND_STEP = {
  MAIN: 'main',
  BATTLE: 'battle'
}

export const battleSlice = createSlice({
  name: "battle",
  initialState: {
    round: 1,
    roundStep: BATTLE_ROUND_STEP.MAIN,
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
    attackCard: (state, action) => {
      const { card, player } = action.payload;
      const battlePlayer = state.players[player];
      battlePlayer.mana.actual -= card.manaCost;
      const cardIndex = battlePlayer.board.findIndex((c) => c.id === card.id);
      battlePlayer.board.splice(cardIndex, 1);
      battlePlayer.arena.push(card);
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
      state.roundStep = BATTLE_ROUND_STEP.MAIN;
      const actualPlayer = state.players[nextPlayer];
      actualPlayer.mana.maximum =
        actualPlayer.mana.maximum < MANA_LIMIT
          ? actualPlayer.mana.maximum + 1
          : MANA_LIMIT;
      actualPlayer.hand.push(actualPlayer.deck.pop()) 
      actualPlayer.mana.actual = actualPlayer.mana.maximum;
    },
    setRoundStep: (state, action) => {
      state.roundStep = action.payload;
    }
  },
});

export const selectPlayer = (player) => (state) => state.battle.players[player];
export const selectBattle = (state) => state.battle;

export const { setupGame, nextRound, castCard, setRoundStep, attackCard } = battleSlice.actions;

export default battleSlice.reducer;
