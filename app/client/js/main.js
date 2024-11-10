
import { SignInForm } from 'app/models/sign-in-form.model.js';
import {player} from "./player.js";
import {Action, ActionTypes} from 'app/nodels/action.models.js'

function handleButtonClick(action) {

    const roomCode = document.getElementById("roomCode").value.trim();
    const name = document.getElementById("name").value.trim();

    if ((roomCode && !name) || (!roomCode && name)) {
        alert("Please enter both Room Code and Name.");
        return;
    }

    if (roomCode && name) {
        const signInForm = new SignInForm(roomCode, name);

        if (action === "create") {
            alert(`Room created successfully with Code: ${signInForm.roomCode} and Name: ${signInForm.name}`);
        }

        else if (action === "join") {
            alert(`Joined room with Code: ${signInForm.roomCode} and Name: ${signInForm.name}`);

        }
        else {
            alert("Please enter both Room Code and Name.")
        }
    }
}

//function to start the game
function startGame() {
    const action = new Action(ActionTypes.START_GAME, "game started!");
    player.sendAction(action);
    alert("Game is starting!");
}

socket.on("message", (event) => {
    let action = new Action(event);
    switch(action.type) {
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

        case ActionTypes .GAME_START:
            alert("The game has started!");
            break;
    }
});

function showStartGameButtonIfHost() {
    if (player.room && player.room.host && player.room.host.name === player.name) {
        document.getElementById("startGameBtn").style.display = "block";
    } else {
        document.getElementById("startGameBtn").style.display = "none";
    }
}

window.handleButtonClick = handleButtonClick;
window.startGame = startGame;








