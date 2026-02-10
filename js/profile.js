/**
 * profile.js - Profile Management Module
 * 
 * Task 7: Profile Page Edit Mode
 * Task 9: Navigation Active State
 * Task 10: Alert System
 */

// Get DOM elements
const profileForm = document.getElementById('profileForm');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileAvatar = document.getElementById('profileAvatar');

// Form input fields
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const studentIdInput = document.getElementById('studentId');
const departmentInput = document.getElementById('department');
const phoneInput = document.getElementById('phone');
const yearInput = document.getElementById('year');

// Store original values for cancel functionality
let originalValues = {};

// Initialize profile page
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    initProfileButtons();
});

// Load user profile data
function loadUserProfile() {
    // Get stored username
    const username = localStorage.getItem('username') || 'Student';
    const email = localStorage.getItem('userEmail') || 'student@university.edu';
    
    // Get user data from users array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.username === username);
    
    if (currentUser) {
        // Populate form fields with user data
        if (fullNameInput) fullNameInput.value = currentUser.fullName || currentUser.username;
        if (emailInput) emailInput.value = currentUser.email || email;
        if (studentIdInput) studentIdInput.value = currentUser.studentId || 'Not set';
        if (departmentInput) departmentInput.value = currentUser.department || 'Not set';
        if (phoneInput) phoneInput.value = currentUser.phone || '';
        if (yearInput) yearInput.value = currentUser.year || 'Not set';
    } else {
        // Fallback values
        if (fullNameInput) fullNameInput.value = username;
        if (emailInput) emailInput.value = email;
        if (studentIdInput) studentIdInput.value = 'Not set';
        if (departmentInput) departmentInput.value = 'Not set';
        if (phoneInput) phoneInput.value = '';
        if (yearInput) yearInput.value = 'Not set';
    }
    
    // Update profile header
    if (profileName) profileName.textContent = fullNameInput.value;
    if (profileEmail) profileEmail.textContent = emailInput.value;
    if (profileAvatar) profileAvatar.textContent = fullNameInput.value.charAt(0).toUpperCase();
    
    // Store original values
    storeOriginalValues();
}

// Store original form values
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

// Initialize button event listeners
function initProfileButtons() {
    // Task 7: Edit button - Enable editing mode
    if (editButton) {
        editButton.addEventListener('click', () => {
            enableEditMode();
        });
    }
    
    // Save button - Save changes
    if (saveButton) {
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            saveProfile();
        });
    }
    
    // Cancel button - Discard changes
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            cancelEdit();
        });
    }
}

// Enable edit mode
function enableEditMode() {
    // Enable all input fields
    const inputs = [fullNameInput, emailInput, studentIdInput, departmentInput, phoneInput, yearInput];
    inputs.forEach(input => {
        if (input) input.disabled = false;
    });
    
    // Show/hide buttons
    if (editButton) editButton.style.display = 'none';
    if (saveButton) saveButton.style.display = 'inline-block';
    if (cancelButton) cancelButton.style.display = 'inline-block';
    
    // Focus on first field
    if (fullNameInput) fullNameInput.focus();
}

// Save profile changes
function saveProfile() {
    // Validate inputs
    if (!validateProfileInputs()) {
        return;
    }
    
    // Get current username
    const username = localStorage.getItem('username');
    
    // Get users array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find and update current user
    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex !== -1) {
        // Update user object with new data
        users[userIndex].fullName = fullNameInput.value;
        users[userIndex].email = emailInput.value;
        users[userIndex].studentId = studentIdInput.value;
        users[userIndex].department = departmentInput.value;
        users[userIndex].phone = phoneInput.value;
        users[userIndex].year = yearInput.value;
        
        // Save updated users array
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update session email if changed
        localStorage.setItem('userEmail', emailInput.value);
    }
    
    // Update profile header
    if (profileName) profileName.textContent = fullNameInput.value;
    if (profileEmail) profileEmail.textContent = emailInput.value;
    if (profileAvatar) profileAvatar.textContent = fullNameInput.value.charAt(0).toUpperCase();
    
    // Store new values
    storeOriginalValues();
    
    // Disable edit mode
    disableEditMode();
    
    // Show success message
    if (window.showAlert) {
        window.showAlert('Profile updated successfully!', 'success');
    }
}

// Cancel edit and restore original values
function cancelEdit() {
    // Restore original values
    fullNameInput.value = originalValues.fullName;
    emailInput.value = originalValues.email;
    studentIdInput.value = originalValues.studentId;
    departmentInput.value = originalValues.department;
    phoneInput.value = originalValues.phone;
    yearInput.value = originalValues.year;
    
    // Disable edit mode
    disableEditMode();
    
    // Show info message
    if (window.showAlert) {
        window.showAlert('Changes discarded', 'info', 2000);
    }
}

// Disable edit mode
function disableEditMode() {
    // Disable all input fields
    const inputs = [fullNameInput, emailInput, studentIdInput, departmentInput, phoneInput, yearInput];
    inputs.forEach(input => {
        if (input) input.disabled = true;
    });
    
    // Show/hide buttons
    if (editButton) editButton.style.display = 'inline-block';
    if (saveButton) saveButton.style.display = 'none';
    if (cancelButton) cancelButton.style.display = 'none';
}

// Validate profile inputs
function validateProfileInputs() {
    // Check full name
    if (!fullNameInput.value.trim()) {
        if (window.showAlert) {
            window.showAlert('Full name is required', 'error');
        }
        fullNameInput.focus();
        return false;
    }
    
    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        if (window.showAlert) {
            window.showAlert('Please enter a valid email address', 'error');
        }
        emailInput.focus();
        return false;
    }
    
    // Check phone format (basic)
    if (phoneInput.value && !/^[\d\s\-+()]+$/.test(phoneInput.value)) {
        if (window.showAlert) {
            window.showAlert('Please enter a valid phone number', 'error');
        }
        phoneInput.focus();
        return false;
    }
    
    return true;
}

