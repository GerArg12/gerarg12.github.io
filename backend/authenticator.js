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


function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function login(user, password) {
  document.getElementById("loginButton").disabled = true;
  document.getElementById("loadingSpinner").style.display = "block";
  
  fetch('https://flowi-api.onrender.com/flowi/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user, password })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("loginButton").disabled = false;
    document.getElementById("loadingSpinner").style.display = "none";
    
    if (data.success) {
      setCookie('token', data.token, 1);
      const decodedToken = parseJwt(data.token);
      console.log('Usuario loggeado');
      window.location.href = 'index.html';
    } else {
      document.getElementById("loginError").style.display = "block";
      console.log('Error al iniciar sesión');
    }
  })
  .catch(error => {
    document.getElementById("loginButton").disabled = false;
    document.getElementById("loadingSpinner").style.display = "none";
    
    console.error('Error:', error);
    document.getElementById("loginError").style.display = "block";
    console.log('Error al iniciar sesión');
  });
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
