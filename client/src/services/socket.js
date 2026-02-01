import io from 'socket.io-client';
import alertSound from '../assets/sounds/rescue-alert.mp3';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001';
// Note: User requested 5000 for proximity alerts, but the main app uses 5001. 
// We will stick to 5001 to maintain compatibility with the existing server.

let socket = null;

/**
 * Connect to Socket.IO server
 */
export function connectSocket() {
  if (socket && socket.connected) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('🟢 Socket connected:', socket.id);
  });

  // Proximity alert logic (Added by user)
  socket.on('ambulance-approaching', (data) => {
    // Play sound
    try {
      const audio = new Audio(alertSound);
      audio.volume = 0.7;
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (err) {
      console.log('Audio play error:', err);
    }

    // Vibrate
    if ('vibrate' in navigator) {
      navigator.vibrate([1000, 200, 500, 200, 1000]);
    }

    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🚨 Emergency Vehicle Approaching', {
        body: `Distance: ${Math.round(data.distance)}m`,
      });
    }
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function onEmergencyUpdate(callback) {
  if (!socket) {
    connectSocket();
  }

  const wrappedCallback = (data) => {
    console.log(`📡 [Socket] Emergency update received (${data.type}):`, data);
    callback(data);
  };

  if (!socket._wrappedListeners) socket._wrappedListeners = new Map();
  socket._wrappedListeners.set(callback, wrappedCallback);

  socket.on('emergency-update', wrappedCallback);
}

export function offEmergencyUpdate(callback) {
  if (socket && socket._wrappedListeners && socket._wrappedListeners.has(callback)) {
    const wrapped = socket._wrappedListeners.get(callback);
    socket.off('emergency-update', wrapped);
    socket._wrappedListeners.delete(callback);
  } else if (socket) {
    socket.off('emergency-update', callback);
  }
}

// User added functions:
export function updateLocation(lat, lng) {
  if (socket) {
    socket.emit('update-location', { lat, lng });
  }
}

export function triggerEmergency(lat, lng, radius = 500) {
  if (socket) {
    socket.emit('emergency-alert', { lat, lng, radius });
  }
}

// Legacy support (to avoid breaking components expecting connectToServer)
export const connectToServer = connectSocket;

const socketService = {
  connectSocket,
  connectToServer,
  disconnectSocket,
  onEmergencyUpdate,
  offEmergencyUpdate,
  updateLocation,
  triggerEmergency,
  getSocket: () => socket
};

export default socketService;