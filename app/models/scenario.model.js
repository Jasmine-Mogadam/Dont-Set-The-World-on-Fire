import { ENERGY_TYPES, Inventory } from "./player.model";

export class Scenario {
  description;
  options = [];

  constructor(description, options) {
    this.description = description;
    this.options = options;
  }
}

export class Option {
  description;
  effect;

  constructor(description, effect) {
    this.description = description;
    this.effect = effect;
  }
}

export class Effect {
  inventory;
  warming = 0;
  pollution = 0;
  constructor(inventory, pollution, money) {
    this.inventory = inventory;
    this.pollution = pollution;
    this.money = money;
  }
}

export const SCENARIOS = [
  new Scenario(
    "A large convention is being held in Chicago, Illinois, increasing the energy usage by $50,000 and 50 Pollution for all decisions.",
    [
      new Option(
        "Invest in petroleum for all incoming and outgoing traffic. Receive $200,000 and produce 200 Pollution.",
        new Effect(new Inventory(ENERGY_TYPES.PETROLEUM), 100, 100000)
      ),
      new Option(
        'Invest in wind power for the "windiest city" in the United States. Receive $50,000 and produce 50 Pollution.',
        new Effect(new Inventory(ENERGY_TYPES.WIND), 50, 50000)
      ),
      new Option(
        "Invest in nuclear energy nearby. Receive $50,000 and produce 50 Pollution.",
        new Effect(new Inventory(ENERGY_TYPES.NUCLEAR), 50, 50000)
      ),
    ]
  ),
];
