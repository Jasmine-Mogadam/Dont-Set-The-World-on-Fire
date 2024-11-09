import { ActionTypes } from "./action.model";

export class Player {
    room;
    name;
    ws;

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
                    this.room = action.body.room;
                    break;
            }
        })
    }

    sendAction(action) {
        ws.send(JSON.stringify(action));
      }
}
