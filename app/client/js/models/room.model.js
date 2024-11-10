import { Action, ActionTypes } from "./action.model.js";

export const MAX_POLLUTION = 1000;

export class Room {
  roomCode;
  host;
  players = [];
  gameInProgress = false;
  pollution = 0;
  currentRound = 0;

  removeDisconnectedPlayer = (player) => {
    //TODO: remove player from room if they disconnect
  };

  constructor(roomCode, host) {
    this.roomCode = roomCode;
    this.host = host;

    host.ws.on("message", (event) => {
      let action = event;
      switch (action.type) {
        case ActionTypes.GAME_START:
          this.startGame();
      }
    });
  }

  addPlayer(player) {
    if (this.gameInProgress) {
      player.websocket.send(
        ActionTypes.SIGN_IN_FAILURE,
        "game already in progress."
      );
      return;
    }

    player.ws.onclose = this.removeDisconnectedPlayer;

    this.players.push(player);
  }

  startGame() {
    this.gameInProgress = true;
    let action = new Action(ActionTypes.GAME_STARTED, "host started the game.");
    sendActionToAllPlayers(action);
  }

  round() {
    // end after 5 rounds
    if (this.currentRound > 5) {
      this.players.forEach((p) => p.sendEndYearMessage());
      cleanup();
      return;
    }

    // SECURITY: Don't let someone send multiple responses in a round
    this.players.forEach((p) => {
      p.alreadyAnswered = false;
    });

    let scenario = getThisRoundsScenario();
    let action = new Action(ActionTypes.SEND_SCENARIO, scenario);

    sendActionToAllPlayers(action);
  }

  getThisRoundsScenario() {
    return SCENARIOS[round];
  }

  addPollution(amount) {
    if (amount === 0) return;

    warmingPoints += amount * (1 / (players.length / 3));
    let action = new Action(ActionTypes.POLLUTION_CHANGED, warmingPoints);
    sendActionToAllPlayers(action);

    if (warmingPoints > MAX_POLLUTION) {
      let action = new Action(ActionTypes.WORLD_ON_FIRE);
      sendActionToAllPlayers(action);
      cleanup();
      players = [];
    }
  }

  sendActionToAllPlayers(action) {
    this.players.forEach((p) => {
      p.sendAction(action);
    });
  }

  cleanupAfterGame() {
    players = [];
  }

  allPlayersAnswered() {
    return this.players.every((player) => player.alreadyAnswered);
  }
}
