import { WebSocketServer } from "ws";
import { Room } from "../models/room.model.js";
import { Action, ActionTypes, dataToAction } from "../models/action.model.js";
import { dataToSignInForm, SignInForm } from "../models/sign-in-form.model.js";
import { Player } from "../models/player.model.js";

const wss = new WebSocketServer({ port: 3000 });
let rooms = [];

wss.on("connection", (ws) => {
  console.log("new client connected!");
  ws.on("close", () => {
    console.log("client disconnected!");
  });

  ws.on("message", (event) => {
    let action = dataToAction(event);
    switch (action.type) {
      case ActionTypes.CREATE_ROOM:
        attemptCreateRoom(action.body);
        break;
      case ActionTypes.JOIN_ROOM:
        attemptJoinRoom(action.body);
        break;
    }
  });

  function attemptCreateRoom(body) {
    let signInForm = dataToSignInForm(body);
    if (checkIfRequiredFieldsAreEmpty(signInForm)) return;
    if (roomCodeExists(signInForm.roomCode)) {
      sendFailure("Room code already exists, choose a different one.");
    }
    let host = new Player(ws, signInForm.name, null, true);
    let room = new Room(signInForm.roomCode, host);
    host.room = room;
    rooms.push(room);
    sendPlayerCreated(host);
  }

  function attemptJoinRoom(body) {
    console.log(typeof body);
    let signInForm = dataToSignInForm(body);
    console.log(signInForm.roomCode);
    console.log(signInForm.name);
    if (checkIfRequiredFieldsAreEmpty(signInForm)) return;
    let room = getRoom(signInForm.roomCode);
    if (room == null) return;
    if (checkIfNameExists(signInForm.name)) return;
    let player = new Player(true, room, ws, signInForm.name);
    room.addPlayer(player);
    sendPlayerCreated(player);
  }

  function checkIfRequiredFieldsAreEmpty(signInForm) {
    let empty = signInForm.roomCode === "" || signInForm.name === "";
    if (empty) sendFailure("room code and name are required.");
    return empty;
  }

  function checkIfNameExists(roomCode, name) {
    let room = rooms.find(roomCode);
    let nameExists = room.players.includes((p) => p.name === name);
    if (nameExists) {
      sendFailure("name already in use.");
    }
    return nameExists;
  }

  function roomCodeExists(roomCode) {
    return rooms.includes(roomCode);
  }

  function sendFailure(message) {
    ws.send(new Action(ActionTypes.SIGN_IN_FAILURE, message));
  }

  function sendPlayerCreated(player) {
    // SECURITY: don't send client room object
    // (don't want to give access to other players' sockets)
    let sanitizedPlayer = new Player(
      player.isHost,
      null,
      player.ws,
      player.name
    );

    ws.send(new Action(ActionTypes.SIGN_IN_SUCCESS, sanitizedPlayer));
  }

  function getRoom(roomCode) {
    if (roomCodeExists(roomCode)) {
      return rooms.find((r) => r.roomCode == roomCode);
    } else {
      sendFailure("room does not exist");
      return null;
    }
  }
});
