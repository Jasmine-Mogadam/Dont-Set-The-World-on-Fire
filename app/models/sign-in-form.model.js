export class SignInForm {
  roomCode;
  name;

  constructor(roomCode, name) {
    this.roomCode = roomCode.toUpperCase();
    this.name = name.toUpperCase();
  }
}

export function dataToSignInForm(data) {
  let roomCode = data.roomCode;
  let name = data.name;
  return new SignInForm(roomCode, name);
}
