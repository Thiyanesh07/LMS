

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

document.addEventListener('DOMContentLoaded', () => {
    renderAssignments();
});

function renderAssignments() {
    const assignmentsList = document.getElementById('assignmentsList');
    if (!assignmentsList) return;

    assignmentsList.innerHTML = '';

    if (assignments.length === 0) {
        assignmentsList.innerHTML = '<p style="color: var(--text-light);">No assignments available</p>';
        return;
    }

    assignments.forEach(assignment => {
        const assignmentCard = createAssignmentCard(assignment);
        assignmentsList.appendChild(assignmentCard);
    });
}

function createAssignmentCard(assignment) {
    const card = document.createElement('div');
    card.className = 'assignment-card';

    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    let status = assignment.status;
    let statusClass = status;

    if (status === 'pending' && dueDate < today) {
        status = 'late';
        statusClass = 'late';
        card.classList.add('late');
    } else if (status === 'submitted') {
        card.classList.add('submitted');
    }

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dueDate.toLocaleDateString('en-US', options);

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

    const submitBtn = card.querySelector('.submit-btn');
    if (submitBtn && status === 'pending') {
        submitBtn.addEventListener('click', () => handleSubmit(assignment.id, card, submitBtn));
    }
    
    return card;
}

function handleSubmit(assignmentId, card, button) {
    
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    assignment.status = 'submitted';

    const statusBadge = card.querySelector('.assignment-status');
    statusBadge.textContent = 'SUBMITTED';
    statusBadge.className = 'assignment-status submitted';

    button.textContent = 'Submitted';
    button.disabled = true;

    card.classList.remove('late');
    card.classList.add('submitted');

    if (window.showAlert) {
        window.showAlert(`${assignment.title} submitted successfully!`, 'success');
    }
}

