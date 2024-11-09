export class SignInForm {
  roomCode;
  name;

  constructor(roomCode, name) {
    this.roomCode = roomCode.toUpperCase();
    this.name = name.toUpperCase();
  }

  constructor(data){
    parsedJson = JSON.parse(data);
    this.roomCode = parsedJson.roomCode.toUpperCase();
    this.name = parsedJson.name.toUpperCase();
}
}
