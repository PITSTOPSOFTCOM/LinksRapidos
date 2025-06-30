function login() {
  const userInput = document.getElementById('username');
  const passInput = document.getElementById('password');
  const errorDiv = document.getElementById('login-error');
  const loginBtn = document.getElementById('loginBtn');

  const user = userInput.value.trim();
  const pass = passInput.value;

  // Desabilita botão pra evitar múltiplos cliques
  loginBtn.disabled = true;
  errorDiv.hidden = true;
  errorDiv.textContent = '';

  const users = [
    { username: 'suporte', password: '#Jornada+2025', mostrarContador: false },
    { username: 'suporte.pev', password: '+Resultados@#', mostrarContador: false },
    { username: 'yuri', password: '1938', mostrarContador: true }
  ];

  // Simula delay para efeito melhor (pode ser removido)
  setTimeout(() => {
    const usuario = users.find(u => u.username === user && u.password === pass);

    if (usuario) {
      localStorage.setItem('usuario', user);
      localStorage.setItem('contadorVisivel', usuario.mostrarContador);
      document.getElementById('login-section').classList.remove('active');
      document.getElementById('content').classList.add('active');
      document.getElementById('logoutBtn').style.display = 'flex'; // mostra botão só aqui
      document.getElementById('login-counter').style.display = usuario.mostrarContador ? 'block' : 'none';
      // Limpa inputs e erros
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
  document.getElementById('logoutBtn').style.display = 'none'; // esconde botão aqui
  document.getElementById('login-counter').style.display = 'none';
}

// Função debounce para melhorar performance na pesquisa
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
  let anyVisible = false;

  boxes.forEach(box => {
    const text = box.innerText.toLowerCase();
    if (text.includes(input)) {
      box.style.display = '';
      anyVisible = true;
    } else {
      box.style.display = 'none';
    }
  });

  const noResults = document.getElementById('no-results');
  if (!anyVisible) {
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
  }
}

// Alterna tema claro/escuro e salva no localStorage
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');

  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Troca ícone do botão
  const icon = document.querySelector('#themeToggleBtn i');
  if (isDark) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Tooltip criação
  document.querySelectorAll('.link-box').forEach(box => {
    const descricao = box.getAttribute('data-descricao');
    if (descricao) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = descricao;
      box.appendChild(tooltip);
    }
  });

  // Check login
  const user = localStorage.getItem('usuario');
  const contadorVisivel = localStorage.getItem('contadorVisivel') === 'true';

  if (user) {
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content').classList.add('active');
    document.getElementById('logoutBtn').style.display = 'flex'; // mostra só se logado
    document.getElementById('login-counter').style.display = contadorVisivel ? 'block' : 'none';
  } else {
    document.getElementById('login-section').classList.add('active');
    document.getElementById('logoutBtn').style.display = 'none'; // esconde botão na tela login
  }

  // Eventos Enter ativa login
  ['username', 'password'].forEach(id => {
    document.getElementById(id).addEventListener('keypress', function (e) {
      if (e.key === 'Enter') login();
    });
  });

  // Pesquisa com debounce
  document
    .getElementById('searchInput')
    .addEventListener('input', debounce(filterLinks, 300));

  // Tema toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Aplica tema salvo
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = document.querySelector('#themeToggleBtn i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});
