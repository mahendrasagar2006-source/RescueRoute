const { Server } = require("socket.io");

let io;
const vehicles = new Map(); // Store connected vehicles: socketId -> {lat, lng}

/**
 * Initialize Socket.IO server
 */
function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });

    // Handle custom events if needed
    socket.on("join-emergency", (emergencyId) => {
      socket.join(emergencyId);
      console.log(`🔗 Socket ${socket.id} joined emergency ${emergencyId}`);
    });

    // Proximity logic: Update vehicle location
    socket.on('update-location', (data) => {
      vehicles.set(socket.id, {
        lat: data.lat,
        lng: data.lng,
        socketId: socket.id
      });
    });

    // Proximity logic: Trigger proximity alerts
    socket.on('emergency-alert', (data) => {
      const { lat, lng, radius } = data;
      console.log(`🚨 Proximity alert triggered at (${lat}, ${lng}) with radius ${radius}m`);

      vehicles.forEach((vehicle, socketId) => {
        const distance = calculateDistance(lat, lng, vehicle.lat, vehicle.lng);
        if (distance <= radius) {
          io.to(socketId).emit('ambulance-approaching', {
            distance: distance,
            message: 'Emergency vehicle approaching'
          });
        }
      });
    });

    socket.on('disconnect', () => {
      vehicles.delete(socket.id);
      console.log("🔴 Client disconnected:", socket.id);
    });
  });

  return io;
}

/**
 * Emit emergency update to all connected clients
 */
function emitEmergencyUpdate(data) {
  if (io) {
    io.emit("emergency-update", data);
    console.log("📡 Emergency update broadcasted:", data.emergency?.emergencyId || "unknown");
  } else {
    console.warn("⚠️ Socket.IO not initialized");
  }
}

/**
 * Emit to specific emergency room
 */
function emitToEmergency(emergencyId, event, data) {
  if (io) {
    io.to(emergencyId).emit(event, data);
    console.log(`📡 Event '${event}' sent to emergency ${emergencyId}`);
  }
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

module.exports = {
  initSocket,
  emitEmergencyUpdate,
  emitToEmergency,
};