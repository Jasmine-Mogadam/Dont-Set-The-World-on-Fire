export class SignInForm {
  roomCode;
  name;

  constructor(roomCode, name) {
    this.roomCode = roomCode.toUpperCase();
    this.name = name.toUpperCase();
  }
}

export function dataToSignInForm(data) {
  let parsedJson = JSON.parse(data);
  let roomCode = parsedJson.roomCode;
  let name = parsedJson.name;
  return new SignInForm(roomCode, name);
}
