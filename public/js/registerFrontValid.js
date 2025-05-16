document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const nameInput = document.getElementById('name');
  const surnameInput = document.getElementById('surname');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const checkbox = document.getElementById('check');
  const errorMessages = document.querySelectorAll('.error-validation');

  form.addEventListener('submit', function (e) {
    let isValid = true;

    // Limpiar mensajes de error previos
    errorMessages.forEach(error => error.textContent = '');

    // Validación de nombre
    if (nameInput.value.trim().length < 2) {
      document.getElementById('nameError').textContent = "El nombre debe tener al menos 2 caracteres.";
      isValid = false;
    }

    // Validación de apellido
    if (surnameInput.value.trim().length < 2) {
      document.getElementById('surnameError').textContent = "El apellido debe tener al menos 2 caracteres.";
      isValid = false;
    }

    // Validación de nombre de usuario
    if (usernameInput.value.trim().length < 3) {
      document.getElementById('usernameError').textContent = "El nombre de usuario debe tener al menos 3 caracteres.";
      isValid = false;
    }

    // Validación de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = "Por favor ingresa un correo electrónico válido.";
      isValid = false;
    }

    // Validación de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(passwordInput.value.trim())) {
      document.getElementById('passwordError').textContent = "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.";
      isValid = false;
    }

    // Validación de confirmación de contraseña
    if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
      document.getElementById('confirmPasswordError').textContent = "Las contraseñas no coinciden.";
      isValid = false;
    }

    // Validación de términos y condiciones
    if (!checkbox.checked) {
      document.getElementById('termsError').textContent = "Debes aceptar los términos y condiciones.";
      isValid = false;
    }

    // Si alguna validación falla, prevenir el envío del formulario
    if (!isValid) {
      e.preventDefault();
    }
  });

});

document.getElementById('show-hide-password').addEventListener('click', function() {
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');
  const icon = this.querySelector('i');
   const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');
  const passwordIcon = document.getElementById('password-eye');
  const confirmPasswordIcon = document.getElementById('confirm-password-eye');

  const isPasswordVisible = passwordField.type === 'text';
  passwordField.type = isPasswordVisible ? 'password' : 'text';
  confirmPasswordField.type = isPasswordVisible ? 'password' : 'text';
  icon.classList.toggle('fa-eye-slash');


function togglePasswordVisibility() {
    const isPasswordVisible = passwordField.type === 'text';
    passwordField.type = isPasswordVisible ? 'password' : 'text';
    confirmPasswordField.type = isPasswordVisible ? 'password' : 'text';

    const iconClass = isPasswordVisible ? 'fa-eye' : 'fa-eye-slash';
    passwordIcon.className = `fas ${iconClass}`;
    confirmPasswordIcon.className = `fas ${iconClass}`;
  }

  passwordIcon.addEventListener('click', togglePasswordVisibility);
  confirmPasswordIcon.addEventListener('click', togglePasswordVisibility);
});

  // // Mostrar/Ocultar la contraseña
  // const showHidePassword = document.getElementById('show-hide-password');
  
  // showHidePassword.addEventListener('click', function () {
  //   const type = passwordInput.type === 'password' ? 'text' : 'password';
  //   passwordInput.type = type;
  //   confirmPasswordInput.type = type;

    
  // Cambiar el ícono dependiendo de si la contraseña está visible o no
  // const icon = type === 'password' ? 'fa-eye' : 'fa-eye-slash';
  // showHidePassword.querySelector('i').className = `fas ${icon}`;
  
  });