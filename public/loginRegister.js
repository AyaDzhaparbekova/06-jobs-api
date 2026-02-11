import { setDiv } from "./index.js";

let loginRegisterDiv;

export const handleLoginRegister = () => {
  loginRegisterDiv = document.getElementById("login-register");

  const showLogin = document.getElementById("show-login");
  const showRegister = document.getElementById("show-register");

  showLogin.addEventListener("click", () => {
    setDiv(document.getElementById("login"));
  });

  showRegister.addEventListener("click", () => {
    setDiv(document.getElementById("register"));
  });
};

export const showLoginRegister = () => {
  setDiv(loginRegisterDiv);
};
