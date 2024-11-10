export class Action{
    type;
    body;

    constructor(type, body){
        this.type = type;
        this.body = body;
    }

    constructor(data){
        parsedJson = JSON.parse(data);
        this.type = parsedJson.type;
        this.body = parsedJson.body;
    }
}

export const ActionTypes = Object.freeze({
    CREATE_ROOM: 0,
    JOIN_ROOM: 1,
    SIGN_IN_FAILURE: 2,
    SIGN_IN_SUCCESS: 3,
    GAME_START: 4,
    GAME_STARTED: 5,
    SEND_SCENARIO: 6,
    ANSWER_SCENARIO: 7,
    WARMING_CHANGED: 8,
});