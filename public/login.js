import { enableInput, message, setToken } from "./index.js";
import { showJobs } from "./jobs.js";

export const handleLogin = () => {
  const loginDiv = document.getElementById("login");
  const button = document.getElementById("login-button");

  loginDiv.addEventListener("click", async (e) => {
    if (e.target === button) {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        enableInput(false);

        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
          setToken(data.token);
          showJobs();
        } else {
          message.textContent = data.msg;
        }

      } catch {
        message.textContent = "Communication error.";
      }

      enableInput(true);
    }
  });
};
