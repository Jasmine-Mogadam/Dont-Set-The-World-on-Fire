import { ActionTypes } from "./action.model";

export class Room {
  roomCode;
  host;
  players = [];
  gameInProgress = false;

  constructor(roomCode, host) {
    this.roomCode = roomCode;
    this.host = host;
  }

  addPlayer(player) {
    if (gameInProgress) {
      player.websocket.send(ActionTypes.FAILURE, "game already in progress.");
      return;
    }

    this.players.push(player);
  }

  startGame() {
    gameInProgress = true;
  }
}
