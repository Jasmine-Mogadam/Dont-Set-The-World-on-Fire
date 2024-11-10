import { ActionTypes } from "../../models/action.model";

 
function initLobby() {
    document.getElementById("form").style.display = "none";
    document.getElementById("lobby").style.display = "block";
    document.getElementById("roomDisplay").textContent = player.room.code;
    showStartGameButtonIfHost();
}



// export function initLobby() {
//     document.getElementById("form").style.display = "none";
//     document.getElementById("lobby").style.display = "block";
// }

// Add event listeners for the buttons when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".create").addEventListener("click", function () {
        handleButtonClick("create");
    });
    document.querySelector(".join").addEventListener("click", function () {
        handleButtonClick("join");
    });
});


function showStartGameButtonIfHost() {
    if (player.isHost) {
        document.getElementById("startGameBtn").style.display = "block";
    } else {
        document.getElementById("startGameBtn").style.display = "none";
    }
}

//function to start the game
function startGame() {
    const action = new action(ActionTypes.START_GAME, "game started!");
    player.sendAction(action);
    alert("Game is starting!");
}


window.startGame = startGame;

