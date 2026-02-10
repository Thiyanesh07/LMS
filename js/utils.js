/**
 * utils.js - Utility Helper Functions
 * 
 * Common functions that can be used across multiple modules
 * Include this file in your HTML if you want to use these utilities
 */

/**
 * Show alert notification
 * @param {string} message - The message to display
 * @param {string} type - Alert type: 'success', 'error', 'info'
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showAlert(message, type = 'info', duration = 3000) {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `
        <span>${message}</span>
    `;

    alertContainer.appendChild(alert);

    // Auto-hide after duration
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, duration);
}

/**
 * Format date to readable string
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Check if date is past due
 * @param {string} dueDate - Due date in YYYY-MM-DD format
 * @returns {boolean}
 */
function isPastDue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
}

/**
 * Get days until due date
 * @param {string} dueDate - Due date in YYYY-MM-DD format
 * @returns {number} Number of days
 */
function getDaysUntilDue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diff = due - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Set active navigation link based on current page
 * @param {string} currentPage - Current page name (e.g., 'dashboard')
 */
function setActiveNav(currentPage) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Get stored username from localStorage
 * @returns {string} Username or 'Student'
 */
function getStoredUsername() {
    return localStorage.getItem('username') || 'Student';
}

/**
 * Store username in localStorage
 * @param {string} username
 */
function storeUsername(username) {
    localStorage.setItem('username', username);
}

/**
 * Toggle sidebar for mobile view
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

/**
 * Initialize sidebar toggle functionality
 */
function initSidebarToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Export functions for use in modules (optional - for organization)
// If using modules, uncomment these:
// export { showAlert, formatDate, isPastDue, getDaysUntilDue, setActiveNav, getStoredUsername, storeUsername };
