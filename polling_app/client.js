const { io } = require("socket.io-client");
const readline = require("node:readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);

    // Prompt the user for input
    rl.question("Type your message here: ", (answer) => {
        console.log("Client message:", answer);
        socket.emit("clientMessage", answer);
       
    });
});

socket.on("serverResponse", (msg) => {
    console.log("Message from server:", msg);
});

socket.on("serverMessage", (msg) => {
    console.log("Broadcast message from server:", msg);
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
