
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

function checkAccess() {
  const role = getCookie('role');
  if (!role || !(role === 'admin')) {
    window.location.href = 'login.html';
    return;
  }
}

function protectPage() {
  const token = getCookie('token');
  if (!token) {
    window.location.href = 'login.html';
  }
  checkAccess();
}

// Llamar a esta función en las páginas que necesitan protección
protectPage();
