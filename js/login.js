document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                alert('Вход выполнен успешно!');
                window.location.href = 'index.html';
            } else {
                alert('Неверный email или пароль');
            }
        });
    }
});