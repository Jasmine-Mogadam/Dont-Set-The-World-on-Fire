import { SignInForm } from "./models/sign-in-form.model.js";
import { player } from "./player.js";
import { Action, ActionTypes } from "./models/action.model.js";

// Handle button clicks to either create or join a room
function handleButtonClick(action) {
  const roomCode = document.getElementById("roomCode").value.trim();
  const name = document.getElementById("name").value.trim();

  const signInForm = new SignInForm(roomCode, name);

  if (!(roomCode && name)) {
    alert("Please enter both room Code and Name.");
    return;
  } else {
    if (action === "create") {
      let action = new Action(ActionTypes.CREATE_ROOM, signInForm);
      player.sendAction(action);
    } else if (action === "join") {
      let action = new Action(ActionTypes.JOIN_ROOM, signInForm);
      player.sendAction(action);
    }
  }
}
//function to start the game
function startGame() {
  const action = new Action(ActionTypes.START_GAME, "game started!");
  player.sendAction(action);
  alert("Game is starting!");
}

/*
socket.on("message", (event) => {
  let action = dataToAction(event);
  switch (action.type) {
    case ActionTypes.SIGN_IN_FAILURE:
      alert(action.body);
      break;
    case ActionTypes.SIGN_IN_SUCCESS:
      //check host status and move to lobby
      document.getElementById("form").style.display = "none";
      document.getElementById("lobby").style.display = "block";
      document.getElementById("roomDisplay").textContent = player.room.code;
      showStartGameButtonIfHost();
      break;

    case ActionTypes.GAME_START:
      alert("The game has started!");
      break;
  }
});*/

function showStartGameButtonIfHost() {
  if (
    player.room &&
    player.room.host &&
    player.room.host.name === player.name
  ) {
    document.getElementById("startGameBtn").style.display = "block";
  } else {
    document.getElementById("startGameBtn").style.display = "none";
  }
}

window.handleButtonClick = handleButtonClick;
window.startGame = startGame;
