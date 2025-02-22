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
  
  function protectPage() {
    const token = getCookie('token');
    const role = getCookie('role');
    
    if (token && (role === 'admin' || role === 'guess')) {
      window.location.href = 'index.html'; // Redirigir a una página específica
    } else {
      console.log('No hay cookies válidas, permitir acceso a login');
    } 
  }
  
  // Llamar a esta función en las páginas que necesitan protección
  protectPage();
