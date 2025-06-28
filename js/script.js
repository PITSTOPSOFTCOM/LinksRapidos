function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  const users = [
    { username: 'suporte', password: '#Jornada+2025', mostrarContador: false },
    { username: 'suporte.pev', password: '+Resultados@#', mostrarContador: false },
    { username: 'yuri', password: '1938', mostrarContador: true }
  ];

  const usuario = users.find(u => u.username === user && u.password === pass);

  if (usuario) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    if (usuario.mostrarContador) {
      let count = localStorage.getItem('loginCount');
      count = count ? parseInt(count) + 1 : 1;
      localStorage.setItem('loginCount', count);
      document.getElementById('login-counter').innerText = `Total de logins neste navegador: ${count}`;
      document.getElementById('login-counter').style.display = 'block';
    }

    fetch('https://script.google.com/macros/s/AKfycbzfpnFhX9utlkAJXmDX6AEuWzhreQPDs9Q0sJd7QuP6YjDh5GjMmOVV2TTYd0yMMkgy/exec', {
      method: 'POST',
      body: new URLSearchParams({ usuario: usuario.username })
    });

    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content').classList.add('active');
    document.getElementById('logoutBtn').style.display = 'block';
  } else {
    alert('Usuário ou senha incorretos.');
  }
}

function logout() {
  localStorage.removeItem('usuarioLogado');
  document.getElementById('content').classList.remove('active');
  document.getElementById('login-section').classList.add('active');
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('logoutBtn').style.display = 'none';
}

function filterLinks() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const boxes = document.querySelectorAll('.link-box');
  boxes.forEach(box => {
    const text = box.textContent.toLowerCase();
    box.style.display = text.includes(input) ? 'flex' : 'none';
  });
}

window.onload = function () {
  const user = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (user) {
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content').classList.add('active');
    document.getElementById('logoutBtn').style.display = 'block';

    if (user.mostrarContador) {
      const count = localStorage.getItem('loginCount') || 0;
      document.getElementById('login-counter').innerText = `Total de logins neste navegador: ${count}`;
      document.getElementById('login-counter').style.display = 'block';
    }
  } else {
    document.getElementById('login-section').classList.add('active');
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const loginBox = document.getElementById('login-section');
      if (loginBox.classList.contains('active')) {
        login();
      }
    }
  });

  document.querySelectorAll('.link-box').forEach(box => {
    const link = box.querySelector('a');
    const descricao = box.getAttribute('data-descricao');
    if (descricao) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = descricao;
      box.appendChild(tooltip);
    }
    box.addEventListener('click', () => {
      if (link) window.open(link.href, '_blank');
    });
  });
}
