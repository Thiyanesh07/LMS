

const signupForm = document.getElementById('signupForm');
const signupUsername = document.getElementById('signupUsername');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
const signupUsernameError = document.getElementById('signupUsernameError');
const signupEmailError = document.getElementById('signupEmailError');
const signupPasswordError = document.getElementById('signupPasswordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usernameValue = signupUsername.value.trim();
    const emailValue = signupEmail.value.trim();
    const passwordValue = signupPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    
    let isValid = true;

    if (usernameValue === '') {
        showError(signupUsernameError, signupUsername, 'Username is required');
        isValid = false;
    } else if (usernameValue.length < 3) {
        showError(signupUsernameError, signupUsername, 'Username must be at least 3 characters');
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(usernameValue)) {
        showError(signupUsernameError, signupUsername, 'Username can only contain letters, numbers, and underscore');
        isValid = false;
    } else if (isUsernameTaken(usernameValue)) {
        showError(signupUsernameError, signupUsername, 'Username already exists');
        isValid = false;
    } else {
        hideError(signupUsernameError, signupUsername);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        showError(signupEmailError, signupEmail, 'Email is required');
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        showError(signupEmailError, signupEmail, 'Please enter a valid email address');
        isValid = false;
    } else if (isEmailTaken(emailValue)) {
        showError(signupEmailError, signupEmail, 'Email already registered');
        isValid = false;
    } else {
        hideError(signupEmailError, signupEmail);
    }

    if (passwordValue === '') {
        showError(signupPasswordError, signupPassword, 'Password is required');
        isValid = false;
    } else {
        hideError(signupPasswordError, signupPassword);
    }

    if (confirmPasswordValue === '') {
        showError(confirmPasswordError, confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
        showError(confirmPasswordError, confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        hideError(confirmPasswordError, confirmPassword);
    }

    if (isValid) {
        createAccount(usernameValue, emailValue, passwordValue);
    }
});

signupUsername.addEventListener('input', () => {
    if (signupUsername.value.trim() !== '') {
        hideError(signupUsernameError, signupUsername);
    }
});

signupEmail.addEventListener('input', () => {
    if (signupEmail.value.trim() !== '') {
        hideError(signupEmailError, signupEmail);
    }
});

signupPassword.addEventListener('input', () => {
    if (signupPassword.value.trim() !== '') {
        hideError(signupPasswordError, signupPassword);
    }
});

confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value.trim() !== '') {
        hideError(confirmPasswordError, confirmPassword);
    }
});

function showError(errorElement, inputElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.style.borderColor = 'var(--danger-color)';
}

function hideError(errorElement, inputElement) {
    errorElement.classList.remove('show');
    inputElement.style.borderColor = 'var(--border-color)';
}

function isUsernameTaken(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

function isEmailTaken(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

function createAccount(username, email, password) {
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const newUser = {
        username: username,
        email: email,
        password: password, 
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    showSuccessAlert('Account created successfully! Redirecting to login...');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function showSuccessAlert(message) {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = 'alert success';
    alert.innerHTML = `<span>✓ ${message}</span>`;
    
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 2500);
}
