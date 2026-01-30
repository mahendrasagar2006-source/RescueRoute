import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket;

export function connectSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("🟢 Connected to RescueRoute socket");
    });
  }
  return socket;
}

export function listenEmergencyUpdates(callback) {
  if (!socket) return;
  socket.on("emergency-update", callback);
}
