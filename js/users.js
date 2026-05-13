// Загрузка и отображение всех пользователей
function loadUsers() {
    const usersGrid = document.getElementById('usersGrid');
    
    // Получаем массив пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Если нет ни одного пользователя
    if (users.length === 0) {
        usersGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <p>Нет зарегистрированных пользователей</p>
                <a href="register.html" class="btn btn-primary">Зарегистрироваться</a>
            </div>
        `;
        return;
    }
    
    // Отображаем карточки
    usersGrid.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-card-header">
                ${user.avatar ? 
                    `<img src="${user.avatar}" class="user-avatar" alt="Аватар">` : 
                    `<div class="user-avatar-placeholder">👤</div>`
                }
                <h3 class="user-name">${user.nickname || user.email.split('@')[0]}</h3>
            </div>
            <div class="user-card-body">
                <p>📧 ${user.email}</p>
                <p>🎭 ${user.role === 'fan' ? 'Болельщик' : 'Эксперт'}</p>
                <p>🏎️ ${user.team || 'Не выбрана'}</p>
                <p>📰 ${user.newsletter ? 'Подписан на новости' : 'Не подписан'}</p>
            </div>
            <div class="user-card-footer">
                📅 Зарегистрирован: ${new Date(user.registeredAt).toLocaleDateString('ru-RU')}
            </div>
        </div>
    `).join('');
}

// Загружаем пользователей при открытии страницы
loadUsers();