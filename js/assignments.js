/**
 * assignments.js - Assignments Module
 * 
 * Task 5: Assignment Status Management
 * - Store assignment data in JavaScript
 * - Display assignments dynamically
 * - Change status text and color based on due date (static logic)
 * - Statuses: Pending, Submitted, Late
 * 
 * Task 6: Assignment Submission Simulation
 * - On clicking "Submit Assignment":
 *   - Change status from Pending to Submitted
 *   - Disable submit button
 *   - Show confirmation message
 * 
 * JavaScript Requirements:
 * - Event listeners
 * - Button state management
 * - Dynamic text updates
 * - Conditional statements
 * - Dynamic class assignment
 * - Date comparison (basic)
 * 
 * Elements to interact with:
 * - #assignmentsList - container for assignment cards
 * - .submit-btn - submit buttons (dynamically created)
 * - #alertContainer - for showing notifications
 * 
 * Task 9: Navigation Active State
 * Task 10: Alert & Notification System
 */

// Sample data structure for assignments
const assignments = [
    {
        id: 1,
        title: 'Web Development Project',
        course: 'CS301 - Web Development',
        dueDate: '2026-02-15',
        status: 'pending',
        description: 'Create a responsive website using HTML, CSS, and JavaScript'
    },
    {
        id: 2,
        title: 'Database Design Assignment',
        course: 'CS402 - Database Management',
        dueDate: '2026-02-18',
        status: 'pending',
        description: 'Design an ER diagram for a library management system'
    },
    {
        id: 3,
        title: 'Algorithm Analysis Report',
        course: 'CS505 - Software Engineering',
        dueDate: '2026-02-12',
        status: 'late',
        description: 'Analyze time complexity of sorting algorithms'
    },
    {
        id: 4,
        title: 'Network Protocol Implementation',
        course: 'CS404 - Computer Networks',
        dueDate: '2026-02-25',
        status: 'pending',
        description: 'Implement a simple TCP client-server application'
    },
    {
        id: 5,
        title: 'Operating System Concepts',
        course: 'CS403 - Operating Systems',
        dueDate: '2026-02-08',
        status: 'submitted',
        description: 'Write a report on process scheduling algorithms'
    }
];

// Initialize assignments page
document.addEventListener('DOMContentLoaded', () => {
    renderAssignments();
});

// Task 5 & 6: Render assignments dynamically
function renderAssignments() {
    const assignmentsList = document.getElementById('assignmentsList');
    if (!assignmentsList) return;

    // Clear existing content
    assignmentsList.innerHTML = '';

    if (assignments.length === 0) {
        assignmentsList.innerHTML = '<p style="color: var(--text-light);">No assignments available</p>';
        return;
    }

    // Loop through assignments and create cards
    assignments.forEach(assignment => {
        const assignmentCard = createAssignmentCard(assignment);
        assignmentsList.appendChild(assignmentCard);
    });
}

// Create individual assignment card
function createAssignmentCard(assignment) {
    const card = document.createElement('div');
    card.className = 'assignment-card';
    
    // Determine status based on due date and current status
    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    let status = assignment.status;
    let statusClass = status;
    
    // If not submitted and past due date, mark as late
    if (status === 'pending' && dueDate < today) {
        status = 'late';
        statusClass = 'late';
        card.classList.add('late');
    } else if (status === 'submitted') {
        card.classList.add('submitted');
    }
    
    // Format due date
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dueDate.toLocaleDateString('en-US', options);
    
    // Calculate days until due
    const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    let dueDateText = '';
    if (status === 'submitted') {
        dueDateText = 'Submitted';
    } else if (daysUntil < 0) {
        dueDateText = `Overdue by ${Math.abs(daysUntil)} days`;
    } else if (daysUntil === 0) {
        dueDateText = 'Due today!';
    } else if (daysUntil === 1) {
        dueDateText = 'Due tomorrow';
    } else {
        dueDateText = `Due in ${daysUntil} days`;
    }
    
    card.innerHTML = `
        <div class="assignment-details">
            <h3>${assignment.title}</h3>
            <div class="assignment-meta">
                <span class="assignment-course">${assignment.course}</span>
                <span class="assignment-due">📅 ${formattedDate} • ${dueDateText}</span>
            </div>
            <p style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.5rem;">${assignment.description}</p>
        </div>
        <div class="assignment-actions">
            <span class="assignment-status ${statusClass}">${status.toUpperCase()}</span>
            <button class="submit-btn" data-id="${assignment.id}" ${status !== 'pending' ? 'disabled' : ''}>
                ${status === 'submitted' ? 'Submitted' : 'Submit'}
            </button>
        </div>
    `;
    
    // Task 6: Add submit button event listener
    const submitBtn = card.querySelector('.submit-btn');
    if (submitBtn && status === 'pending') {
        submitBtn.addEventListener('click', () => handleSubmit(assignment.id, card, submitBtn));
    }
    
    return card;
}

// Task 6: Handle assignment submission
function handleSubmit(assignmentId, card, button) {
    // Find the assignment
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;
    
    // Update assignment status
    assignment.status = 'submitted';
    
    // Update UI
    const statusBadge = card.querySelector('.assignment-status');
    statusBadge.textContent = 'SUBMITTED';
    statusBadge.className = 'assignment-status submitted';
    
    // Update button
    button.textContent = 'Submitted';
    button.disabled = true;
    
    // Update card styling
    card.classList.remove('late');
    card.classList.add('submitted');
    
    // Show success message
    if (window.showAlert) {
        window.showAlert(`${assignment.title} submitted successfully!`, 'success');
    }
}

