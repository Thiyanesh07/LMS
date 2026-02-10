/**
 * auth.js - Login Validation Module
 * 
 * Task 1: Login Validation (Client-Side)
 * 
 * Requirements:
 * - Validate username and password fields
 * - Display error messages if fields are empty
 * - Allow login only if both fields are filled
 * - Redirect to dashboard page on successful validation
 * 
 * JavaScript Requirements:
 * - Event handling (submit, click)
 * - DOM selection and manipulation
 * - Prevent default form submission
 * 
 * Elements to interact with:
 * - #loginForm - form element
 * - #username - username input
 * - #password - password input
 * - #usernameError - error message for username
 * - #passwordError - error message for password
 * - #loginButton - submit button
 */

// Get DOM elements
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
    
    // Validate username
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
    
    // Validate password
    if (passwordValue === '') {
        passwordError.textContent = 'Password is required';
        passwordError.classList.add('show');
        password.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else if (passwordValue.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.classList.add('show');
        password.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else if (!/[A-Z]/.test(passwordValue)) {
        passwordError.textContent = 'Password must contain at least one uppercase letter';
        passwordError.classList.add('show');
        password.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else if (!/[a-z]/.test(passwordValue)) {
        passwordError.textContent = 'Password must contain at least one lowercase letter';
        passwordError.classList.add('show');
        password.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else if (!/[0-9]/.test(passwordValue)) {
        passwordError.textContent = 'Password must contain at least one number';
        passwordError.classList.add('show');
        password.style.borderColor = 'var(--danger-color)';
        isValid = false;
    } else {
        passwordError.classList.remove('show');
        password.style.borderColor = 'var(--border-color)';
    }
    
    // If validation passes, check credentials
    if (isValid) {
        // Check if user exists and password matches
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
        
        // Successful login
        localStorage.setItem('username', user.username);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('isLoggedIn', 'true');
        showSuccessMessage();

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }
});

// Clear error when user starts typing
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

// Function to show success alert
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