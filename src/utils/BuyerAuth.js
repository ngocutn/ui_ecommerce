const BuyerAuth = () => {
  const registerButton = document.querySelector(".register-button");
  const loginButton = document.querySelector(".login-button");
  const container = document.querySelector(".container");

  registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });
  loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
};

export const UserAuth = () => {
  const registerButton = document.querySelector(".register-button");
  const loginButton = document.querySelector(".login-button");
  const container = document.querySelector(".container");

  registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });
  loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
};

export default BuyerAuth;
