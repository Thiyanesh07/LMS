// Initialize default credentials
function initializeDefaultCredentials() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const guestExists = users.find(u => u.username.toLowerCase() === 'guest');
    
    if (!guestExists) {
        users.push({
            username: 'guest',
            email: 'guest@example.com',
            password: '1234'
        });
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Initialize on page load
initializeDefaultCredentials();

const loginForm = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const loginButton = document.getElementById('loginButton');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    
    let isValid = true;

    if (usernameValue === '') {
        usernameError.textContent = 'Username is required';
        usernameError.classList.add('show');
        username.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else if (usernameValue.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        usernameError.classList.add('show');
        username.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(usernameValue)) {
        usernameError.textContent = 'Username can only contain letters, numbers, and underscore';
        usernameError.classList.add('show');
        username.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else {
        usernameError.classList.remove('show');
        username.style.borderColor = 'var(--border-color)';
    }

    if (passwordValue === '') {
        passwordError.textContent = 'Password is required';
        passwordError.classList.add('show');
        password.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else {
        passwordError.classList.remove('show');
        password.style.borderColor = 'var(--border-color)';
    }

    if (isValid) {
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username.toLowerCase() === usernameValue.toLowerCase());
        
        if (!user) {
            usernameError.textContent = 'Username not found. Please sign up first.';
            usernameError.classList.add('show');
            username.style.borderColor = 'var(--danger-color)';
            return;
        }
        
        if (user.password !== passwordValue) {
            passwordError.textContent = 'Incorrect password';
            passwordError.classList.add('show');
            password.style.borderColor = 'var(--danger-color)';
            return;
        }

        localStorage.setItem('username', user.username);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('isLoggedIn', 'true');
        showSuccessMessage();

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }
});

username.addEventListener('input', () => {
    if (username.value.trim() !== '') {
        usernameError.classList.remove('show');
        username.style.borderColor = 'var(--border-color)';
    }
});

password.addEventListener('input', () => {
    if (password.value.trim() !== '') {
        passwordError.classList.remove('show');
        password.style.borderColor = 'var(--border-color)';
    }
});

function showSuccessMessage() {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = 'alert success';
    alert.innerHTML = `<span>Login successful! Redirecting to dashboard...</span>`;
    
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 1500);
}