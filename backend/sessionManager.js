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
  const loginItem = document.getElementById('loginItem');
  if (loginItem) {
    // Oculta el elemento de login
    loginItem.style.display = 'none';
    // O si prefieres deshabilitar el enlace:
    // loginItem.innerHTML = '<a href="#" class="text-danger disabled" tabindex="-1" aria-disabled="true">Iniciar sesión</a>';
  }
}

document.addEventListener('DOMContentLoaded', updateNavbar);

