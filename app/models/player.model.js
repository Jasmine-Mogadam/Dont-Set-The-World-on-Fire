export class Player {
    room;
    name;
    ws;

    constructor(room, name, ws){
        this.room = room;
        this.name = name;
        this.ws = ws;
    }

    constructor(name, ws){
        this.name = name;
        this.ws = ws;
    }
}
