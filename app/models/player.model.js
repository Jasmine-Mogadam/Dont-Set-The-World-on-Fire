import { ActionTypes } from "./action.model";

export class Player {
    room;
    name;
    ws;
    money = 0;
    isHost = false;
    alreadyAnswered = false;
    inventory = [[]];

    constructor(isHost, room, name, ws){
        this.isHost = isHost;
        this(room, name, ws);
    }

    constructor(room, name, ws){
        this.room = room;
        this(name, ws);
    }

    constructor(name, ws){
        this.name = name;
        this(ws)
    }

    constructor(ws){
        this.ws = ws;

        ws.on("message", (event) => {
            let action = new Action(event);

            switch (action.type) {
                case ActionTypes.SIGN_IN_SUCCESS:
                    this.name = action.body.name;
                    this.roomCode = action.body.roomCode;
                    this.isHost = action.body.isHost;
                    break;
                case ActionTypes.ANSWER_SCENARIO:
                    let answer = new Option(action.body);
                    handleInventory(answer);
            }
        })
    }

    sendAction(action) {
        ws.send(JSON.stringify(action));
    }

    handleInventory(answer){
        // SECURITY: don't trust the user's option values, use the option id
        // to get the server's version
        let trueOption = this.room.getThisRoundsScenario.options[answer.id]
        if(trueOption === null) return; // if user sent fake option, do nothing

        this.alreadyAnswered = true;
    }
}

export class Inventory{
    petroleum = 0;
    wind = 0;
    nuclear = 0;
    biofuel = 0;
    solar = 0;
    naturalGas = 0;

    constructor(energyType){
        switch(energyType){
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

    constructor(petroleum, wind, nuclear, 
        biofuel, solar, naturalGas
    ) {
        this.petroleum = petroleum;
        this.wind = wind;
        this.nuclear = nuclear;
        this.biofuel = biofuel;
        this.solar = solar;
        this.naturalGas = naturalGas;
    }

    addInventory(inventory){
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