

const courses = [
    {
        id: 1,
        name: 'Web Development',
        code: 'CS301',
        instructor: 'Dr. Smith',
        status: 'active',
        progress: 75,
        credits: 3
    },
    {
        id: 2,
        name: 'Database Management',
        code: 'CS402',
        instructor: 'Dr. Johnson',
        status: 'active',
        progress: 60,
        credits: 4
    },
    {
        id: 3,
        name: 'Data Structures',
        code: 'CS201',
        instructor: 'Dr. Williams',
        status: 'completed',
        progress: 100,
        credits: 3
    },
    {
        id: 4,
        name: 'Operating Systems',
        code: 'CS403',
        instructor: 'Dr. Brown',
        status: 'active',
        progress: 45,
        credits: 4
    },
    {
        id: 5,
        name: 'Computer Networks',
        code: 'CS404',
        instructor: 'Dr. Davis',
        status: 'active',
        progress: 30,
        credits: 3
    },
    {
        id: 6,
        name: 'Software Engineering',
        code: 'CS505',
        instructor: 'Dr. Wilson',
        status: 'active',
        progress: 50,
        credits: 3
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
});

function renderCourses() {
    const courseGrid = document.getElementById('courseGrid');
    if (!courseGrid) return;

    courseGrid.innerHTML = '';

    if (courses.length === 0) {
        courseGrid.innerHTML = '<p style="color: var(--text-light); grid-column: 1/-1;">No courses available</p>';
        return;
    }

    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        courseGrid.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';

    const statusClass = course.status === 'active' ? 'active' : 'completed';
    const statusText = course.status === 'active' ? 'ACTIVE' : 'COMPLETED';
    
    card.innerHTML = `
        <div class="course-header">
            <h3>${course.name}</h3>
            <p>${course.code} • ${course.instructor}</p>
        </div>
        <div class="course-body">
            <div class="course-info">
                <span>Credits: ${course.credits}</span>
                <span class="course-status ${statusClass}">${statusText}</span>
            </div>
            <div class="course-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <p style="font-size: 0.875rem; color: var(--text-light); margin-top: 0.5rem;">
                    Progress: ${course.progress}%
                </p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        if (window.showAlert) {
            window.showAlert(`Viewing details for ${course.name}`, 'info');
        }
    });
    
    return card;
}
