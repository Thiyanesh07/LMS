/**
 * signup.js - User Registration Module
 * 
 * Requirements:
 * - Validate all form fields
 * - Check if username/email already exists
 * - Ensure password and confirm password match
 * - Store user credentials in localStorage
 * - Redirect to login page after successful registration
 */

// Get DOM elements
const signupForm = document.getElementById('signupForm');
const signupUsername = document.getElementById('signupUsername');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
const signupUsernameError = document.getElementById('signupUsernameError');
const signupEmailError = document.getElementById('signupEmailError');
const signupPasswordError = document.getElementById('signupPasswordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Handle form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usernameValue = signupUsername.value.trim();
    const emailValue = signupEmail.value.trim();
    const passwordValue = signupPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    
    let isValid = true;
    
    // Validate username
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
    
    // Validate email
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
    
    // Validate password
    if (passwordValue === '') {
        showError(signupPasswordError, signupPassword, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 6) {
        showError(signupPasswordError, signupPassword, 'Password must be at least 6 characters');
        isValid = false;
    } else if (!/[A-Z]/.test(passwordValue)) {
        showError(signupPasswordError, signupPassword, 'Password must contain at least one uppercase letter');
        isValid = false;
    } else if (!/[a-z]/.test(passwordValue)) {
        showError(signupPasswordError, signupPassword, 'Password must contain at least one lowercase letter');
        isValid = false;
    } else if (!/[0-9]/.test(passwordValue)) {
        showError(signupPasswordError, signupPassword, 'Password must contain at least one number');
        isValid = false;
    } else {
        hideError(signupPasswordError, signupPassword);
    }
    
    // Validate confirm password
    if (confirmPasswordValue === '') {
        showError(confirmPasswordError, confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
        showError(confirmPasswordError, confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        hideError(confirmPasswordError, confirmPassword);
    }
    
    // If all validations pass, create account
    if (isValid) {
        createAccount(usernameValue, emailValue, passwordValue);
    }
});

// Clear errors on input
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

// Helper function to show error
function showError(errorElement, inputElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputElement.style.borderColor = 'var(--danger-color)';
}

// Helper function to hide error
function hideError(errorElement, inputElement) {
    errorElement.classList.remove('show');
    inputElement.style.borderColor = 'var(--border-color)';
}

// Check if username already exists
function isUsernameTaken(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

// Check if email already exists
function isEmailTaken(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Create new account
function createAccount(username, email, password) {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Create new user object
    const newUser = {
        username: username,
        email: email,
        password: password, // Note: In real apps, never store plain text passwords!
        createdAt: new Date().toISOString()
    };
    
    // Add new user to array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    showSuccessAlert('Account created successfully! Redirecting to login...');
    
    // Redirect to login page after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Show success alert
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
