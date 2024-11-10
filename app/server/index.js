<<<<<<< Updated upstream
import { WebSocketServer } from "ws";
import { Room } from "../models/room.model.js";
import { Action, ActionTypes } from "../models/action.model";
import { SignInForm, SignInForm } from "../models/sign-in-form.model";
import { Player } from "../models/player.model.js";

const wss = new WebSocketServer({ port: 3000 });
let rooms = [];

wss.on("connection", (ws) => {
  console.log("new client connected!");
  ws.on("close", () => {
    console.log("client disconnected!");
  });

  ws.onmessage((event) => {
    let action = new Action(event);
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
    let signInForm = new SignInForm(body);
    if (checkIfRequiredFieldsAreEmpty(signInForm)) return;
    if (roomCodeExists(signInForm.roomCode)) {
      sendFailure("Room code already exists, choose a different one.");
    }
    let host = new Player(ws, signInForm.name);
    let room = new Room(roomCode, host);
    host.room = room;
    rooms.push(room);
    sendPlayerCreated(host);
  }

  function attemptJoinRoom(body) {
    let signInForm = new SignInForm(body);
    if (checkIfRequiredFieldsAreEmpty(signInForm)) return;
    let room = getRoom(signInForm.roomCode);
    if (room == null) return;
    if (checkIfNameExists(signInForm.name)) return;
    let player = new Player(room, ws, signInForm.name);
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
    ws.send(new Action(ActionTypes.SIGN_IN_SUCCESS, player));
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
=======

// JavaScript for the main 

 


>>>>>>> Stashed changes
