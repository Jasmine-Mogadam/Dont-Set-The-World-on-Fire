import { Action, ActionTypes } from "./action.model";

export const MAX_POLLUTION = 1000;

export class Room {
  roomCode;
  host;
  players = [];
  gameInProgress = false;
  pollution = 0;
  currentRound = 0;

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

    this.players.push(player);
  }

  startGame() {
    this.gameInProgress = true;
    let action = new Action(ActionTypes.GAME_STARTED, "host started the game.");
    sendActionToAllPlayers(action);
  }

  round() {
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

  addWarmingPoints(amount) {
    if (amount === 0) return;

    warmingPoints += amount;
    let action = new Action(ActionTypes.WARMING_CHANGED, warmingPoints);
    sendActionToAllPlayers(action);

    if (warmingPoints > MAX_POLLUTION) {
      let action = new Action(ActionTypes.WORLD_ON_FIRE);
      sendActionToAllPlayers(action);
    }
  }

  sendActionToAllPlayers(action) {
    this.players.forEach((p) => {
      p.sendAction(action);
    });
  }
}
