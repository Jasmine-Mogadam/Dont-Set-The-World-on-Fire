import { ActionTypes } from "../../models/action.model";

const socket = new WebSocket("ws://localhost:3000");
export var player = new Player(socket);

socket.on("message", (event) => {
  let action = new Action(event);
  switch (action.type) {
    case ActionTypes.SIGN_IN_FAILURE:
      alert(action.body);
      break;
    case ActionTypes.SIGN_IN_SUCCESS:
      //TODO: go to lobby!!
      break;
    case ActionTypes.GAME_START:
      //TODO: go to lobby!!
      break;
  }
});
