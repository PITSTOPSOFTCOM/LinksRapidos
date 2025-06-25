function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  const users = [
    { username: 'suporte', password: 'qaz@123' },
    { username: 'suporte.pev', password: '+Resultados@#' },
    { username: 'yuri', password: '1938' }
  ];

  const autorizado = users.some(u => u.username === user && u.password === pass);

  if (autorizado) {
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('content').classList.add('active');
  } else {
    alert('Usuário ou senha incorretos.');
  }
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
  document.getElementById('login-section').classList.add('active');

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