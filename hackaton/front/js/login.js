const apiUrl = 'http://localhost:9823/login';

const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const results = await response.json();

      if (results.success) {
        alert("Login bem-sucedido!");
        window.location.href = "index.html";
      } else {
        alert("Usuário ou senha incorretos!");
      }
});