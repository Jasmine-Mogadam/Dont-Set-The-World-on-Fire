import { ActionTypes } from "../../models/action.model";
import {Player} from "../../models/player.model";

const socket = new WebSocket("ws://localhost:3000");
const playerInstance = new Player(socket);

// attaching player to the global window object for global access
window.player = playerInstance;

//export  paleyr if needed to import it elsewhere
export var player = playerInstance;

socket.on("message", (event) => {
  let action = new Action(event);
  switch (action.type) {
    case ActionTypes.SIGN_IN_FAILURE:
      alert(action.body);
      break;
    case ActionTypes.SIGN_IN_SUCCESS:
      //TODO: go to lobby!!
      document.getElementById("form").style.display = "none";
      document.getElementById("lobby").style.display = "block";
      document.getElementById("roomDisplay").textContent = player.room.code;
      initLobby();
      break;
    case ActionTypes.GAME_START:
      //TODO: go to lobby!!
      alert("The game has started");
      break;
  }
});
