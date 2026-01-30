const API_BASE_URL = "http://localhost:5000"; // backend URL

export async function triggerEmergency(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/emergency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Emergency API error:", error);
    return { success: false };
  }
}
