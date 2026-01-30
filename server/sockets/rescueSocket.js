const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
}

// Emit emergency to all connected clients
function emitEmergencyUpdate(data) {
  if (io) {
    io.emit("emergency-update", data);
    console.log("📡 Emergency update sent to clients");
  }
}

module.exports = { initSocket, emitEmergencyUpdate };
