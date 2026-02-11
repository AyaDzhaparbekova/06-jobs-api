import { enableInput, message, setToken } from "./index.js";
import { showJobs } from "./jobs.js";

export const handleRegister = () => {
  const registerDiv = document.getElementById("register");
  const button = document.getElementById("register-button");

  registerDiv.addEventListener("click", async (e) => {
    if (e.target === button) {
      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      try {
        enableInput(false);

        const response = await fetch("/api/v1/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.status === 201) {
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
