console.log('authenticator.js');

function login(email, password) {
  fetch('https://flowi-api.onrender.com/flowi/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Usuario loggeado');
    } else {
      console.log('Error al iniciar sesión');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al iniciar sesión');
  });
}


document.getElementById("loginButton").addEventListener("click", function () {
    const email = document.getElementById("form2Example11").value;
    const password = document.getElementById("form2Example22").value;
    console.log(email, password);
    login(email, password);
});