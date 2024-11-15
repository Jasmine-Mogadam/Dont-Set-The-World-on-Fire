export class Action {
  type;
  body;

  constructor(type, body) {
    this.type = type;
    this.body = body;
  }
}

export function dataToAction(data) {
  let parsedJson = JSON.parse(data);
  let type = parsedJson.type;
  let body = parsedJson.body;
  return new Action(type, body);
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
  POLLUTION_CHANGED: 8,
  WON_GAME: 9,
  LOST_GAME: 10,
  WORLD_ON_FIRE: 11,
});
