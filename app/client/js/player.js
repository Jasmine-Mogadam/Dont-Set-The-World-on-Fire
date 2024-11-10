import { ActionTypes } from "./models/action.model.js";
import { MAX_POLLUTION } from "./models/room.model.js";
import { initLobby, startGame } from "./lobby.js";
import { Player } from "./models/player.model.js";

const socket = new WebSocket("ws://localhost:3000");
export var player = new Player(socket);

socket.onmessage = (event) => {
  let action = dataToAction(event);
  switch (action.type) {
    case ActionTypes.SIGN_IN_FAILURE:
      alert(action.body);
      break;
    case ActionTypes.SIGN_IN_SUCCESS:
      player = dataToPlayer(action.body);
      initLobby();
      break;
    case ActionTypes.GAME_STARTED:
      startGame();
      break;
    case ActionTypes.SEND_SCENARIO:
      //TODO: populate options!!
      let scenario = new Scenario(action.body);
      alert(JSON.stringify(scenario));
      break;
    case ActionTypes.POLLUTION_CHANGED:
      let currentPollution = JSON.parse(action.body);
      let warmingPercentage = (currentPollution / MAX_POLLUTION) * 100;

      //TODO: update a bar to show current warming
      alert("new pollution: " + warmingPercentage + "%");
      break;
    case ActionTypes.WORLD_ON_FIRE:
      //TODO: add loss screen
      alert("you lose!!");
      break;
  }
};
