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
    ANSWER_SCENARIO: 2,
    FAILURE: 3
});