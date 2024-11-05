document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  try {
    const response = await fetch("http://localhost:443/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error("Invalid username or password.");
    }

    const { token } = await response.json();
    await browser.storage.local.set({ token });
    errorMessage.textContent = "Login successful!";

  } catch (error) {
    errorMessage.textContent = error.message;
  }
});
