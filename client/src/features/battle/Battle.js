import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

// import Hand from "./Hand";
// import Board from "./Board";
// import Arena from "./Arena";

// import BattleStyle from "./Battle.module.css";
// import useBattle, { BATTLE_PLAYERS, BATTLE_ROUND_STEP } from "./useBattle";

let ws = new WebSocket('ws://localhost:8080');
let isWsConnected = false;

ws.onmessage = message => {
  try {
    console.log(message)
    const action = JSON.parse(message.data)
    const  {type, payload} = action
    switch (type)  {
      case 'setBattle':
        console.log(payload)
    }
  } catch (error) {
    console.log(error)
  }
}

ws.onopen = () => {
  isWsConnected = true

  ws.send(JSON.stringify({
    type: 'startBattle'
  }))
}


function Battle () {
  return <div>Starting battle</div>
}

// function Battle() {
//   const battleHook = useBattle();
//   const {
//     battle,
//     nextRound,
//     setRoundStep,
//     castCreature,
//     attackCard,
//   } = battleHook;
//   const { players } = battle;
//   const {
//     [BATTLE_PLAYERS.PLAYER]: player,
//     [BATTLE_PLAYERS.ADVERSARY]: adversary,
//   } = players;

//   const handleDragEnd = (player) => (props) => {
//     if (!props.destination) {
//       return;
//     }

//     switch (props.destination.droppableId) {
//       case "board":
//         castCreature({
//           player: player.key,
//           card: player.hand[props.source.index],
//         });
//         break;

//       case "arena":
//         attackCard({
//           card: player.board[props.source.index],
//           player: player.key,
//         });
//         break;

//       default:
//         break;
//     }
//   };

//   const nextStep = (step) => {
//     switch (step) {
//       case BATTLE_ROUND_STEP.MAIN:
//         return (
//           <button onClick={() => setRoundStep(BATTLE_ROUND_STEP.BATTLE)}>
//             Battle
//           </button>
//         );
//       case BATTLE_ROUND_STEP.BATTLE:
//         return (
//           <button onClick={() => setRoundStep(BATTLE_ROUND_STEP.DEFENSE)}>
//             Attack
//           </button>
//         );
//       case BATTLE_ROUND_STEP.DEFENSE:
//         return (
//           <button onClick={() => setRoundStep(BATTLE_ROUND_STEP.END_BATTLE)}>
//             Defense
//           </button>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={BattleStyle.battle}>
//       <div className={BattleStyle.combat}>
//         <DragDropContext onDragEnd={handleDragEnd(adversary)}>
//           <Hand player={adversary} position="top" battleHook={battleHook} />
//           <Board player={adversary} battleHook={battleHook} />
//           <Arena player={adversary} battleHook={battleHook} />
//         </DragDropContext>

//         <DragDropContext onDragEnd={handleDragEnd(player)}>
//           <Arena player={player} battleHook={battleHook} />
//           <Board player={player} battleHook={battleHook} />
//           <Hand player={player} position="bottom" battleHook={battleHook} />
//         </DragDropContext>
//       </div>
//       <div className={BattleStyle.stats}>
//         <div>
//           Mana: ({adversary.mana.actual}/{adversary.mana.maximum}) <br />
//           Hp: {adversary.hp}
//         </div>
//         <div>
//           Round: {battle.round} <br />
//           {battle.attackingPlayer}
//           <button onClick={nextRound}>Next turn</button>
//           {nextStep(battle.roundStep)}
//         </div>
//         <div>
//           Mana: ({player.mana.actual}/{player.mana.maximum}) <br />
//           Hp: {player.hp}
//         </div>
//       </div>
//     </div>
//   );
// }

export default Battle;
