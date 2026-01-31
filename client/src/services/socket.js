import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket = null;

/**
 * Connect to Socket.IO server
 */
export function connectSocket() {
  if (socket && socket.connected) {
    console.log('Socket already connected');
    return socket;
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    console.log('🟢 Socket connected:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('🔴 Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error);
  });

  return socket;
}

/**
 * Disconnect from Socket.IO server
 */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected');
  }
}

/**
 * Listen for emergency updates
 */
export function onEmergencyUpdate(callback) {
  if (!socket) {
    console.warn('Socket not connected. Call connectSocket() first.');
    return;
  }

  socket.on('emergency-update', (data) => {
    console.log('📡 Emergency update received:', data);
    callback(data);
  });
}

/**
 * Join specific emergency room
 */
export function joinEmergency(emergencyId) {
  if (!socket) {
    console.warn('Socket not connected');
    return;
  }

  socket.emit('join-emergency', emergencyId);
  console.log(`🔗 Joined emergency room: ${emergencyId}`);
}

/**
 * Leave emergency room
 */
export function leaveEmergency(emergencyId) {
  if (!socket) {
    return;
  }

  socket.emit('leave-emergency', emergencyId);
  console.log(`🔌 Left emergency room: ${emergencyId}`);
}

/**
 * Remove all event listeners
 */
export function removeAllListeners() {
  if (socket) {
    socket.removeAllListeners();
  }
}

/**
 * Get socket instance
 */
export function getSocket() {
  return socket;
}

export default {
  connectSocket,
  disconnectSocket,
  onEmergencyUpdate,
  joinEmergency,
  leaveEmergency,
  removeAllListeners,
  getSocket,
};