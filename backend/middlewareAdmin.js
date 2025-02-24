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

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function checkAccess() {
  const token = getCookie('token');
  const decodedToken = parseJwt(token);
  if (!decodedToken) {
    window.location.href = 'login.html';
    return;
  }

  const role = decodedToken.role;
  if (role === 'guess') {
    alert('No tienes permisos para acceder a esta página');
    window.location.href = 'index.html';
  } else if (role !== 'admin') {
    window.location.href = 'login.html';
  } else {
    console.log('Role valido');
  }
}

function protectPage() {
  const token = getCookie('token');
  if (!token) {
    window.location.href = 'login.html';
  } else {
    console.log('Token válido');
  }

  checkAccess();
}

// Llamar a esta función en las páginas que necesitan protección
protectPage();
