document.getElementById("saveToken").addEventListener("click", () => {
  const authToken = document.getElementById("authToken").value;
  chrome.storage.local.set({ authToken }, () => {
    alert("Token saved successfully!");
  });
});
