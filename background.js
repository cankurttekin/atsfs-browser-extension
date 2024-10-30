async function getAuthToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get("authToken", (data) => {
      resolve(data.authToken);
    });
  });
}

// Placeholder for setting token (could be done on popup login)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SET_AUTH_TOKEN") {
    chrome.storage.local.set({ authToken: message.token });
  }
});
