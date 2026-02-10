/**
 * dashboard.js - Dashboard Module
 * 
 * Task 3: Dynamic Dashboard Cards
 * Task 9: Navigation Active State
 * Task 10: Alert System
 */

// Sample data structure for dashboard stats
const dashboardStats = [
    {
        title: 'Total Courses',
        value: 6,
        label: 'Enrolled Courses'
    },
    {
        title: 'Assignments Due',
        value: 3,
        label: 'Pending Submissions'
    },
    {
        title: 'Attendance',
        value: '92%',
        label: 'Overall Attendance'
    },
    {
        title: 'GPA',
        value: '3.8',
        label: 'Current Semester'
    }
];

// Sample data for assignments preview
const upcomingAssignments = [
    {
        id: 1,
        title: 'Web Development Project',
        course: 'CS301',
        dueDate: '2026-02-15',
        status: 'pending'
    },
    {
        id: 2,
        title: 'Database Design',
        course: 'CS402',
        dueDate: '2026-02-18',
        status: 'pending'
    },
    {
        id: 3,
        title: 'Algorithm Analysis',
        course: 'CS505',
        dueDate: '2026-02-20',
        status: 'submitted'
    }
];

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayUserName();
    renderDashboardStats();
    renderUpcomingAssignments();
});

// Display logged-in user's name
function displayUserName() {
    const userName = document.getElementById('userName');
    if (userName) {
        const storedUsername = localStorage.getItem('username') || 'Student';
        userName.textContent = storedUsername;
    }
}

// Task 3: Render dashboard statistics cards
function renderDashboardStats() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;

    // Clear existing content
    statsGrid.innerHTML = '';

    // Loop through stats and create cards
    dashboardStats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        
        statCard.innerHTML = `
            <h3>${stat.title}</h3>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        
        statsGrid.appendChild(statCard);
    });
}

// Render upcoming assignments preview
function renderUpcomingAssignments() {
    const assignmentsPreview = document.getElementById('assignmentsPreview');
    if (!assignmentsPreview) return;

    // Clear existing content
    assignmentsPreview.innerHTML = '';

    if (upcomingAssignments.length === 0) {
        assignmentsPreview.innerHTML = '<p style="color: var(--text-light);">No upcoming assignments</p>';
        return;
    }

    // Loop through assignments and create preview items
    upcomingAssignments.forEach(assignment => {
        const assignmentItem = document.createElement('div');
        assignmentItem.className = 'assignment-item';
        
        const dueDate = new Date(assignment.dueDate);
        const today = new Date();
        const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        let dueDateText = '';
        if (daysUntil < 0) {
            dueDateText = 'Overdue';
        } else if (daysUntil === 0) {
            dueDateText = 'Due today';
        } else if (daysUntil === 1) {
            dueDateText = 'Due tomorrow';
        } else {
            dueDateText = `Due in ${daysUntil} days`;
        }
        
        assignmentItem.innerHTML = `
            <div class="assignment-info">
                <h4>${assignment.title}</h4>
                <p>${assignment.course} • ${dueDateText}</p>
            </div>
            <span class="assignment-status ${assignment.status}">${assignment.status.toUpperCase()}</span>
        `;
        
        assignmentsPreview.appendChild(assignmentItem);
    });
}

