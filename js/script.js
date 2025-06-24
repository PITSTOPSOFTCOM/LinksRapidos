function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === 'suporte' && pass === 'qaz@123') {
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
    box.addEventListener('click', () => {
      if (link) window.open(link.href, '_blank');
    });
  });
}
