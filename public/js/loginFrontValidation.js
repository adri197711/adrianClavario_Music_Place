document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const showHide = document.getElementById("show-hide");

  form.addEventListener("submit", function (e) {
    let errors = [];

    // Limpiar errores anteriores del frontend
    document.querySelectorAll(".error.frontend").forEach(el => el.remove());
    [emailInput, passwordInput].forEach(input => input.classList.remove("input-error"));

    // Validación email
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue || !emailRegex.test(emailValue)) {
      errors.push({ field: emailInput, message: "Ingrese un email válido." });
    }

    // Validación contraseña
    const passwordValue = passwordInput.value.trim();
    if (!passwordValue) {
      errors.push({ field: passwordInput, message: "La contraseña es obligatoria." });
    }

    if (errors.length > 0) {
      e.preventDefault(); // Detener envío del form

      errors.forEach(err => {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error", "frontend");
        errorDiv.innerText = err.message;
        err.field.classList.add("input-error");
        err.field.insertAdjacentElement("afterend", errorDiv);
      });
    }
  });

  // Mostrar/Ocultar contraseña

if (showHide) {
  showHide.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showHide.textContent = "Ocultar";
    } else {
      passwordInput.type = "password";
      showHide.textContent = "Mostrar";
    }
  });
}
});
