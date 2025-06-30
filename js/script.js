function login() {
  const userInput = document.getElementById('username');
  const passInput = document.getElementById('password');
  const errorDiv = document.getElementById('login-error');
  const loginBtn = document.getElementById('loginBtn');

  const user = userInput.value.trim();
  const pass = passInput.value;

  loginBtn.disabled = true;
  errorDiv.hidden = true;
  errorDiv.textContent = '';

  const users = [
    { username: 'suporte', password: '#Jornada+2025', mostrarContador: false },
    { username: 'suporte.pev', password: '+Resultados@#', mostrarContador: false },
    { username: 'yuri', password: '1938', mostrarContador: true }
  ];

  setTimeout(() => {
    const usuario = users.find(u => u.username === user && u.password === pass);

    if (usuario) {
      localStorage.setItem('usuario', user);
      localStorage.setItem('contadorVisivel', usuario.mostrarContador);
      document.getElementById('login-section').classList.remove('active');
      document.getElementById('content').classList.add('active');
      document.getElementById('logoutBtn').style.display = 'flex';
      document.getElementById('login-counter').style.display = usuario.mostrarContador ? 'block' : 'none';
      userInput.value = '';
      passInput.value = '';
      errorDiv.hidden = true;
    } else {
      errorDiv.textContent = 'Usuário ou senha incorretos';
      errorDiv.hidden = false;
      passInput.value = '';
      passInput.focus();
    }
    loginBtn.disabled = false;
  }, 300);
}

function logout() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('contadorVisivel');
  document.getElementById('login-section').classList.add('active');
  document.getElementById('content').classList.remove('active');
  document.getElementById('logoutBtn').style.display = 'none';
  document.getElementById('login-counter').style.display = 'none';
}

// Função debounce para otimizar a pesquisa
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function filterLinks() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const boxes = document.querySelectorAll('.link-box');
  const container = document.querySelector('.link-container');
  let anyVisible = false;

  boxes.forEach(box => {
    const text = box.innerText.toLowerCase();
    if (text.includes(input)) {
      box.classList.remove('hidden');
      anyVisible = true;
    } else {
      box.classList.add('hidden');
    }
  });

  const visibleBoxes = [...boxes].filter(box => !box.classList.contains('hidden'));

  if (!anyVisible) {
    document.getElementById('no-results').hidden = false;
    container.classList.remove('search-result');
  } else {
    document.getElementById('no-results').hidden = true;
    container.classList.add('search-result');
  }

  // Se só 1 item visível, aplica classe extra para centralizar
  if (visibleBoxes.length === 1) {
    container.classList.add('single-item');
  } else {
    container.classList.remove('single-item');
  }
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');

  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  const icon = document.querySelector('#themeToggleBtn i');
  icon.classList.remove(isDark ? 'fa-moon' : 'fa-sun');
  icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
}

document.addEventListener('DOMContentLoaded', () => {
  // Cria tooltips
  document.querySelectorAll('.link-box').forEach(box => {
    const descricao = box.getAttribute('data-descricao');
    if (descricao) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = descricao;
      box.appendChild(tooltip);
    }
  });

  // Login automático se salvo no localStorage
  const user = localStorage.getItem('usuario');
  const contadorVisivel = localStorage.getItem('contadorVisivel') === 'true';

  if (user) {
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content').classList.add('active');
    document.getElementById('logoutBtn').style.display = 'flex';
    document.getElementById('login-counter').style.display = contadorVisivel ? 'block' : 'none';
  } else {
    document.getElementById('login-section').classList.add('active');
    document.getElementById('logoutBtn').style.display = 'none';
  }

  // Enter ativa login
  ['username', 'password'].forEach(id => {
    document.getElementById(id).addEventListener('keypress', function (e) {
      if (e.key === 'Enter') login();
    });
  });

  // Input de pesquisa com debounce
  document
    .getElementById('searchInput')
    .addEventListener('input', debounce(filterLinks, 300));

  // Alternância de tema
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

  // Aplica tema salvo
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = document.querySelector('#themeToggleBtn i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});
