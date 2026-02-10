

const profileForm = document.getElementById('profileForm');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileAvatar = document.getElementById('profileAvatar');

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const studentIdInput = document.getElementById('studentId');
const departmentInput = document.getElementById('department');
const phoneInput = document.getElementById('phone');
const yearInput = document.getElementById('year');

let originalValues = {};

document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    initProfileButtons();
});

function loadUserProfile() {
    
    const username = localStorage.getItem('username') || 'Student';
    const email = localStorage.getItem('userEmail') || 'student@university.edu';

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.username === username);
    
    if (currentUser) {
        
        if (fullNameInput) fullNameInput.value = currentUser.fullName || currentUser.username;
        if (emailInput) emailInput.value = currentUser.email || email;
        if (studentIdInput) studentIdInput.value = currentUser.studentId || 'Not set';
        if (departmentInput) departmentInput.value = currentUser.department || 'Not set';
        if (phoneInput) phoneInput.value = currentUser.phone || '';
        if (yearInput) yearInput.value = currentUser.year || 'Not set';
    } else {
        
        if (fullNameInput) fullNameInput.value = username;
        if (emailInput) emailInput.value = email;
        if (studentIdInput) studentIdInput.value = 'Not set';
        if (departmentInput) departmentInput.value = 'Not set';
        if (phoneInput) phoneInput.value = '';
        if (yearInput) yearInput.value = 'Not set';
    }

    if (profileName) profileName.textContent = fullNameInput.value;
    if (profileEmail) profileEmail.textContent = emailInput.value;
    if (profileAvatar) profileAvatar.textContent = fullNameInput.value.charAt(0).toUpperCase();

    storeOriginalValues();
}

function storeOriginalValues() {
    originalValues = {
        fullName: fullNameInput.value,
        email: emailInput.value,
        studentId: studentIdInput.value,
        department: departmentInput.value,
        phone: phoneInput.value,
        year: yearInput.value
    };
}

function initProfileButtons() {
    
    if (editButton) {
        editButton.addEventListener('click', () => {
            enableEditMode();
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            saveProfile();
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            cancelEdit();
        });
    }
}

function enableEditMode() {
    
    const inputs = [fullNameInput, emailInput, studentIdInput, departmentInput, phoneInput, yearInput];
    inputs.forEach(input => {
        if (input) input.disabled = false;
    });

    if (editButton) editButton.style.display = 'none';
    if (saveButton) saveButton.style.display = 'inline-block';
    if (cancelButton) cancelButton.style.display = 'inline-block';

    if (fullNameInput) fullNameInput.focus();
}

function saveProfile() {
    
    if (!validateProfileInputs()) {
        return;
    }

    const username = localStorage.getItem('username');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex !== -1) {
        
        users[userIndex].fullName = fullNameInput.value;
        users[userIndex].email = emailInput.value;
        users[userIndex].studentId = studentIdInput.value;
        users[userIndex].department = departmentInput.value;
        users[userIndex].phone = phoneInput.value;
        users[userIndex].year = yearInput.value;

        localStorage.setItem('users', JSON.stringify(users));

        localStorage.setItem('userEmail', emailInput.value);
    }

    if (profileName) profileName.textContent = fullNameInput.value;
    if (profileEmail) profileEmail.textContent = emailInput.value;
    if (profileAvatar) profileAvatar.textContent = fullNameInput.value.charAt(0).toUpperCase();

    storeOriginalValues();

    disableEditMode();

    if (window.showAlert) {
        window.showAlert('Profile updated successfully!', 'success');
    }
}

function cancelEdit() {
    
    fullNameInput.value = originalValues.fullName;
    emailInput.value = originalValues.email;
    studentIdInput.value = originalValues.studentId;
    departmentInput.value = originalValues.department;
    phoneInput.value = originalValues.phone;
    yearInput.value = originalValues.year;

    disableEditMode();

    if (window.showAlert) {
        window.showAlert('Changes discarded', 'info', 2000);
    }
}

function disableEditMode() {
    
    const inputs = [fullNameInput, emailInput, studentIdInput, departmentInput, phoneInput, yearInput];
    inputs.forEach(input => {
        if (input) input.disabled = true;
    });

    if (editButton) editButton.style.display = 'inline-block';
    if (saveButton) saveButton.style.display = 'none';
    if (cancelButton) cancelButton.style.display = 'none';
}

function validateProfileInputs() {
    
    if (!fullNameInput.value.trim()) {
        if (window.showAlert) {
            window.showAlert('Full name is required', 'error');
        }
        fullNameInput.focus();
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        if (window.showAlert) {
            window.showAlert('Please enter a valid email address', 'error');
        }
        emailInput.focus();
        return false;
    }

    if (phoneInput.value && !/^[\d\s\-+()]+$/.test(phoneInput.value)) {
        if (window.showAlert) {
            window.showAlert('Please enter a valid phone number', 'error');
        }
        phoneInput.focus();
        return false;
    }
    
    return true;
}

