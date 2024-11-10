 
function initLobby() {
    document.getElementById("form").style.display = "none";
    document.getElementById("lobby").style.display = "block";


    document.getElementById("roomDisplay").textContent = player.room.code;
    
    
    showStartGameButtonIfHost();
}

// Handle button clicks to either create or join a room
function handleButtonClick(action) {
    const roomCode = document.getElementById("roomCode").value.trim();
    const name = document.getElementById("name").value.trim();

    if ((roomCode && !name) || (!roomCode && name)) {
        alert("Please enter both room Code and Name.");
        return;
    }

    if (roomCode && name) {
        if (action === "create") {
            alert("Room created successfully!");
        } else if (action === "join") {
            alert("Joined room successfully!");
        } else {
            alert("Please enter both Room Code and Name.");
        }

        // Hide login form and show lobby
        document.getElementById("form").style.display = "none";
        document.getElementById("lobby").style.display = "block";

        // Display the room code in the lobby
        document.getElementById("roomDisplay").textContent = roomCode;
    } else {
        alert("Please enter both Room Code and Name.");
    }
}

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

