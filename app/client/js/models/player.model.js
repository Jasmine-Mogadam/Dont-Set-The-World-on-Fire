import { ActionTypes } from "./action.model.js";

export const MONEY_GOAL = 100000000;

export class Player {
  room;
  name;
  ws;
  money = 0;
  isHost = false;
  alreadyAnswered = false;
  inventory = [[]];

  constructor(ws, name = null, room = null, isHost = false) {
    this.isHost = isHost;
    this.room = room;
    this.name = name;
    this.ws = ws;
  }

  sendAction(action) {
    this.ws.send(JSON.stringify(action));
  }

  handleInventory(answer) {
    // SECURITY: don't trust the user's option values, use the option id
    // to get the server's version
    let trueOption = this.room.getThisRoundsScenario.options[answer.id];
    if (trueOption === null) return; // if user sent fake option, do nothing

    this.alreadyAnswered = true;
  }

  sendEndYearMessage() {
    let action = new Action(ActionTypes.LOST_GAME, this.money);
    if (this.atGoal()) {
      action = new Action(ActionTypes.WON_GAME, this.money);
    }

    this.sendAction(action);
  }

  atGoal() {
    return this.money >= MONEY_GOAL;
  }
}

export class Inventory {
  petroleum = 0;
  wind = 0;
  nuclear = 0;
  biofuel = 0;
  solar = 0;
  naturalGas = 0;

  constructor(energyType) {
    switch (energyType) {
      case ENERGY_TYPES.PETROLEUM:
        this.petroleum += 1;
        break;
      case ENERGY_TYPES.WIND:
        this.wind += 1;
        break;
      case ENERGY_TYPES.NUCLEAR:
        this.nuclear += 1;
        break;
      case ENERGY_TYPES.BIOFUEL:
        this.biofuel += 1;
        break;
      case ENERGY_TYPES.SOLAR:
        this.solar += 1;
        break;
      case ENERGY_TYPES.NATURAL_GAS:
        this.naturalGas += 1;
        break;
    }
  }

  addInventory(inventory) {
    this.petroleum = inventory.petroleum;
    this.wind = inventory.wind;
    this.nuclear = inventory.nuclear;
    this.biofuel = inventory.biofuel;
    this.solar = inventory.solar;
    this.naturalGas = inventory.naturalGas;
  }
}

export const ENERGY_TYPES = Object.freeze({
  PETROLEUM: 0,
  WIND: 1,
  NUCLEAR: 2,
  BIOFUEL: 3,
  SOLAR: 4,
  NATURAL_GAS: 5,
});
