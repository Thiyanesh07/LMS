/**
 * theme.js - Theme Switcher & Sidebar Toggle Module
 * 
 * Task 8: Theme Switcher (Light / Dark Mode)
 * Task 2: Sidebar Toggle (Responsive UI)
 */

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    setActiveNavigation();
});

// Task 8: Theme Switcher
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update button icon
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Show notification
        showAlert(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info', 1500);
    });
}

// Task 2: Sidebar Toggle
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (!menuToggle || !sidebar) return;

    // Open/close sidebar on menu toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        if (overlay) {
            overlay.classList.toggle('active');
        }
    });

    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Close sidebar when clicking a nav link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            }
        });
    });
}

// Task 9: Set active navigation based on current page
function setActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Task 10: Alert notification system
function showAlert(message, type = 'info', duration = 3000) {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ⓘ';
    alert.innerHTML = `<span>${icon} ${message}</span>`;

    alertContainer.appendChild(alert);

    // Auto-hide after duration
    setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transform = 'translateX(100%)';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, duration);
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.showAlert = showAlert;
}

