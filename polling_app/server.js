const { Server } = require("socket.io");
const io = new Server(3000); // Listen on port 3000

const readline = require("node:readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Type your message here: ", (answer) => {
    console.log("Server message:", answer);
    // Broadcast message to all clients
    io.emit("serverMessage", answer);
    rl.close(); // Close readline interface after getting input
});

io.on("connection", (socket) => {
    console.log("Client connected with socket ID:", socket.id);

    // Send a predefined message to the connected client
    socket.emit("serverResponse", "Welcome to the server!");

    // Listen for messages from the client
    socket.on("clientMessage", (msg) => {
        console.log("Received message from client:", msg);
    });
});
