const http = require("http");
const app = require("./app");
const { initSocket } = require("./sockets/rescueSocket");

const PORT = 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚑 RescueRoute backend running on http://localhost:${PORT}`);
});
