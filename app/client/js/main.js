
import { SignInForm } from 'app/models/sign-in-form.model.js';


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

window.handleButtonClick = handleButtonClick;








