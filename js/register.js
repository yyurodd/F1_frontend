// ========== АВАТАР ==========
const avatarInput = document.getElementById('avatar');
const previewImg = document.getElementById('previewImg');
const previewDiv = document.getElementById('avatarPreview');

if (avatarInput) {
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const img = new Image();
        const reader = new FileReader();
        const canvas = document.createElement('canvas');
        
        reader.onload = function(event) {
            img.src = event.target.result;
        };
        
        img.onload = function() {
            let size = Math.min(img.width, img.height);
            if (size > 500) size = 500;
            
            canvas.width = size;
            canvas.height = size;
            
            const sx = (img.width - size) / 2;
            const sy = (img.height - size) / 2;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
            
            const avatarDataUrl = canvas.toDataURL('image/jpeg');
            previewImg.src = avatarDataUrl;
            previewDiv.style.display = 'block';
            window.avatarData = avatarDataUrl;
        };
        
        reader.readAsDataURL(file);
    });
}

// ========== ВАЛИДАЦИЯ ==========
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e10600';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    input.style.borderColor = '#e10600';
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.style.borderColor = '#3a3a4a';
}

function validateEmail(email) {
    const regex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return regex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// ========== ПРОВЕРКА ПОЛЕЙ ПРИ ВВОДЕ ==========
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', function() {
    if (this.value.length > 0 && !validateEmail(this.value)) {
        showError(this, 'Введите корректный email (пример: name@domain.com)');
    } else {
        clearError(this);
    }
});

const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', function() {
    if (this.value.length > 0 && !validatePassword(this.value)) {
        showError(this, 'Пароль должен быть минимум 6 символов');
    } else {
        clearError(this);
        
        const confirmInput = document.getElementById('confirm_password');
        if (confirmInput.value.length > 0 && confirmInput.value !== this.value) {
            showError(confirmInput, 'Пароли не совпадают');
        } else if (confirmInput.value.length > 0) {
            clearError(confirmInput);
        }
    }
});

const confirmInput = document.getElementById('confirm_password');
confirmInput.addEventListener('input', function() {
    const password = document.getElementById('password').value;
    
    if (this.value.length > 0 && this.value !== password) {
        showError(this, 'Пароли не совпадают');
    } else if (this.value.length > 0 && this.value === password) {
        clearError(this);
    } else if (this.value.length === 0) {
        clearError(this);
    }
});

// ========== ОТПРАВКА ФОРМЫ (РЕГИСТРАЦИЯ) ==========
const form = document.getElementById('registerForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    let isValid = true;
    
    if (!validateEmail(email)) {
        showError(emailInput, 'Введите корректный email (пример: name@domain.com)');
        isValid = false;
    }
    
    if (!validatePassword(password)) {
        showError(passwordInput, 'Пароль должен быть минимум 6 символов');
        isValid = false;
    }
    
    if (password !== confirm) {
        showError(confirmInput, 'Пароли не совпадают');
        isValid = false;
    }
    
    if (isValid) {
        const newUser = {
            id: Date.now(),
            email: email,
            password: password,
            nickname: document.getElementById('nickname').value,
            role: document.querySelector('input[name="role"]:checked')?.value,
            team: document.getElementById('team').value,
            newsletter: document.getElementById('newsletter')?.checked,
            avatar: window.avatarData || '',
            registeredAt: new Date().toISOString()
        };
        
        // Сохраняем в массив всех пользователей
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        
        if (userExists) {
            showError(emailInput, 'Пользователь с таким email уже зарегистрирован');
            return;
        }
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Автоматически входим после регистрации
        sessionStorage.setItem('currentUser', JSON.stringify(newUser));
        
        alert('Регистрация успешна!');
        window.location.href = 'users.html';
    }
});