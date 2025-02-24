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

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function updateNavbar() {
  const token = getCookie('token');
  const loginItem = document.getElementById('loginItem');

  if (token) {
    const decodedToken = parseJwt(token);
    if (decodedToken) {
      loginItem.innerHTML = '<a href="#" id="logoutButton" class="text-danger">Cerrar sesión</a>';
      document.getElementById('logoutButton').addEventListener('click', function () {
        eraseCookie('token');
        window.location.href = 'index.html';
      });
    } else {
      loginItem.innerHTML = '<a href="login.html" class="text-danger">Login</a>';
    }
  } else {
    loginItem.innerHTML = '<a href="login.html" class="text-danger">Login</a>';
  }
}

document.addEventListener('DOMContentLoaded', updateNavbar);

