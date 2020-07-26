import { useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";

import cards from "cards";

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

export const BATTLE_PLAYERS = {
  PLAYER: "player",
  ADVERSARY: "adversary",
};

export const BATTLE_ROUND_STEP = {
  MAIN: "main",
  BATTLE: "battle",
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
  round: 1,
  roundStep: BATTLE_ROUND_STEP.MAIN,
  attackingPlayer: BATTLE_PLAYERS.PLAYER,
  players: {
    [BATTLE_PLAYERS.PLAYER]: {
      ...playerStateModel,
      key: BATTLE_PLAYERS.PLAYER
    },
    [BATTLE_PLAYERS.ADVERSARY]: {
      ...playerStateModel,
      key: BATTLE_PLAYERS.ADVERSARY
    },
  },
};

function reducer(state, action) {
  const { payload } = action;

  switch (action.type) {
    case "BATTLE_UPDATE":
      return {
        ...state,
        ...payload,
      };

    case "HAND_ADD_CARD":
      const actualPlayer = { ...state.players[payload.player] };
      actualPlayer.hand = [...actualPlayer.hand, payload.card];

      return {
        ...state,
        players: {
          ...state.players,
          [payload.player]: actualPlayer,
        },
      };

    case "PLAYER_UPDATE":
      return {
        ...state,
        players: {
          ...state.players,
          [payload.key]: {
            ...state.players[payload.key],
            ...payload.player,
          },
        },
      };

    default:
      return state;
  }
}

function useBattle() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Object.values(BATTLE_PLAYERS).forEach((player) => {
      const deck = generateDeck();
      const hand = deck.splice(
        deck.length - HAND_INITIAL_SIZE - 1,
        HAND_INITIAL_SIZE
      );

      dispatch({
        type: "PLAYER_UPDATE",
        payload: {
          key: player,
          player: {
            deck,
            hand,
          },
        },
      });
    });
  }, []);

  function draw({ player }) {
    const deck = [...state.players[player].deck];
    const hand = [...state.players[player].hand];
    hand.push(deck.pop());

    dispatch({
      type: "PLAYER_UPDATE",
      payload: {
        key: player,
        player: {
          deck,
          hand,
        },
      },
    });
  }

  function nextRound() {
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

    dispatch({
      type: "BATTLE_UPDATE",
      payload: {
        attackingPlayer: nextPlayer,
        round: state.round + 1,
        roundStep: BATTLE_ROUND_STEP.MAIN,
      },
    });

    const actualPlayer = state.players[nextPlayer];
    const mana =
      actualPlayer.mana.maximum <= MANA_LIMIT
        ? actualPlayer.mana.maximum + 1
        : MANA_LIMIT;

    dispatch({
      type: "PLAYER_UPDATE",
      payload: {
        key: nextPlayer,
        player: {
          mana: {
            maximum: mana,
            actual: mana,
          },
        },
      },
    });

    draw({ player: nextPlayer });
  }

  function castCreature({ player, card }) {
    const board = [...state.players[player].board];
    const hand = [...state.players[player].hand];
    const mana = state.players[player].mana.actual - card.manaCost;
    if (mana < 0) return;

    const cardIndex = hand.findIndex((c) => c.id === card.id);
    if (cardIndex === -1) {
      return;
    }

    board.push(hand.splice(cardIndex, 1)[0]);
    dispatch({
      type: "PLAYER_UPDATE",
      payload: {
        key: player,
        player: {
          mana: {
            ...state.players[player].mana,
            actual: mana,
          },
          board,
          hand,
        },
      },
    });
  }

  function attackCard({ card, player }) {
    const arena = [...state.players[player].arena];
    const board = [...state.players[player].board];

    const cardIndex = board.findIndex((c) => c.id === card.id);
    if (cardIndex === -1) {
      return;
    }

    arena.push(board.splice(cardIndex, 1)[0]);
    dispatch({
      type: "PLAYER_UPDATE",
      payload: {
        key: player,
        player: {
          arena,
          board,
        },
      },
    });
  }

  function setRoundStep(step) {
    dispatch({
      type: "BATTLE_UPDATE",
      payload: {
        roundStep: step,
      },
    });
  }

  return {
    battle: state,
    draw,
    castCreature,
    attackCard,
    setRoundStep,
    nextRound,
  };
}

export default useBattle;
