console.log('authenticator.js');

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

function login(user, password) {
  fetch('https://flowi-api.onrender.com/flowi/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      setCookie('token', data.token, 1);
      setCookie('role', data.role, 1);
      console.log('Usuario loggeado');
      window.location.href = 'index.html';
    } else {
      document.getElementById("loginError").style.display = "block";
      console.log('Error al iniciar sesión');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById("loginError").style.display = "block";
    console.log('Error al iniciar sesión');
  });
}

function logout() {
  eraseCookie('token');
  eraseCookie('role');
  window.location.href = 'index.html';
}

document.getElementById("loginButton").addEventListener("click", function () {
  const user = document.getElementById("form2Example11").value;
  const password = document.getElementById("form2Example22").value;
  
  // Resetear mensajes de error
  document.getElementById("userError").style.display = "none";
  document.getElementById("passwordError").style.display = "none";
  document.getElementById("loginError").style.display = "none";

  // Validar campos vacíos
  if (!user) {
    document.getElementById("userError").style.display = "block";
    return;
  }
  if (!password) {
    document.getElementById("passwordError").style.display = "block";
    return;
  }

  login(user, password);
});

document.getElementById("backButton").addEventListener("click", function () {
  window.location.href = "index.html";
});
