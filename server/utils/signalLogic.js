/**
 * Decide which signals to turn GREEN
 */

function generateGreenCorridor(routeSignals = []) {
  if (!routeSignals.length) {
    return {
      status: "NO_SIGNALS_FOUND",
      signals: [],
    };
  }

  return {
    corridorId: "GC-" + Date.now(),
    status: "ACTIVE",
    signals: routeSignals.map((signal) => ({
      signalId: signal,
      state: "GREEN",
    })),
  };
}

module.exports = { generateGreenCorridor };
