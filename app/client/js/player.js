import { ActionTypes } from "../models/action.model";
import { MAX_POLLUTION } from "../models/room.model";
import initLobby from './lobby.js';

const socket = new WebSocket("ws://localhost:3000");
const playerInstance = new Player(socket);

// attaching player to the global window object for global access
window.player = playerInstance;

//export player if needed to import it elsewhere
export var player = playerInstance;

socket.on("message", (event) => {
  let action = new Action(event);
  switch (action.type) {
    case ActionTypes.SIGN_IN_FAILURE:
      alert(action.body);
      break;
    case ActionTypes.SIGN_IN_SUCCESS:
      initLobby(); 
      break;
    case ActionTypes.GAME_STARTED:
      //TODO: go to game!!
      // make for the host a start game button, for students make a waiting for host button
      alert("The game has started");
      break;
    case ActionTypes.SEND_SCENARIO:
      //TODO: populate options!!
      let scenario = new Scenario(action.body);
      alert(JSON.stringify(scenario));
      break;
    case ActionTypes.WARMING_CHANGED:
      let currentWarmingPoints = JSON.parse(action.body);
      let warmingPercentage = (currentWarmingPoints / MAX_POLLUTION) * 100;

      //TODO: update a bar to show current warming
      alert("new warming: " + warmingPercentage + "%");
      break;
    case ActionTypes.WORLD_ON_FIRE:
      //TODO: add loss screen
      alert("you lose!!");
      break;
  }
});
