const headerHTML = `
<header id="top">
    <div class="header-top">
        <div class="header-logo">
            <h1>Энциклопедия Формулы-1</h1>
            <p>Всё о королевских гонках: команды, пилоты и технологии</p>
        </div>
        <div class="header-actions">
            <div class="user-info" id="userInfo"></div>
            <div class="auth-buttons" id="authButtons">
                <a href="../html/register.html" class="auth-btn" id="registerLink">Регистрация</a>
                <a href="../html/login.html" class="auth-btn" id="loginLink">Вход</a>
            </div>
            <button id="themeToggle" class="theme-btn">🌙</button>
        </div>
    </div>
    <nav>
        <ul>
            <li><a href="../html/index.html">Главная</a></li>
            <li><a href="../html/teams.html">Команды</a></li>
            <li><a href="../html/legends.html">Легенды</a></li>
            <li><a href="../html/users.html">Пользователи</a></li>
        </ul>
    </nav>
    <hr>
</header>
`;

const footerHTML = `
<footer>
    <hr>
    <p><a href="#top">⬆ Вернуться наверх</a></p>
    <p>&copy; 2026 Энциклопедия F1. Все права защищены.</p>
</footer>
`;

document.getElementById('header-placeholder').innerHTML = headerHTML;
document.getElementById('footer-placeholder').innerHTML = footerHTML;

// Отображение текущего пользователя
function updateUserDisplay() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const userInfoDiv = document.getElementById('userInfo');
    const authButtons = document.getElementById('authButtons');
    
    if (currentUser && currentUser.email) {
        userInfoDiv.innerHTML = `
            <div class="user-info-display">
                ${currentUser.avatar ? 
                    `<img src="${currentUser.avatar}" class="user-avatar-small" alt="Аватар">` : 
                    `<div class="user-avatar-placeholder-small">👤</div>`
                }
                <span class="user-name-small">${currentUser.nickname || currentUser.email.split('@')[0]}</span>
                <button class="logout-btn-small" onclick="logout()">Выйти</button>
            </div>
        `;
        userInfoDiv.style.display = 'flex';
        authButtons.style.display = 'none';
    } else {
        userInfoDiv.style.display = 'none';
        authButtons.style.display = 'flex';
    }
}

window.logout = function() {
    sessionStorage.removeItem('currentUser');
    updateUserDisplay();
    window.location.href = 'index.html';
};

updateUserDisplay();



// Смена темы
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.textContent = '☀️';
    } else {
        document.body.classList.remove('light-theme');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.textContent = '🌙';
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.textContent = isLight ? '☀️' : '🌙';
    }
}

// Ждём загрузки DOM и вешаем обработчик
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
});