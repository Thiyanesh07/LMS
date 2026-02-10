# University Learning Management System (LMS) - UI Project

## 📋 Project Overview
A complete front-end Learning Management System with client-side interactivity using vanilla JavaScript.

## 🎯 Project Requirements
- **Front-end only** (No database, No backend)
- **No frameworks or libraries** (Pure vanilla JavaScript)
- **ES6 syntax** (let, const, arrow functions)
- **Modular code** (Separate JS files)
- **No inline JavaScript**

## 📁 Project Structure
```
js-2/
├── index.html              # Login page
├── dashboard.html          # Dashboard with stats
├── courses.html           # Courses list
├── assignments.html       # Assignments management
├── profile.html           # User profile
│
├── css/
│   ├── main.css          # Global styles, variables, login page
│   ├── layout.css        # Layout, sidebar, responsive design
│   └── component.css     # Component styles (cards, buttons, forms)
│
├── js/
│   ├── auth.js           # Task 1: Login validation
│   ├── dashboard.js      # Task 3: Dynamic dashboard cards
│   ├── courses.js        # Task 4: Course list rendering
│   ├── assignments.js    # Task 5 & 6: Assignment management
│   ├── profile.js        # Task 7: Profile edit mode
│   └── theme.js          # Task 8: Theme switcher & sidebar toggle
│
└── images/               # Image assets (if needed)
```

## ✅ Tasks to Implement

### Task 1: Login Validation (auth.js)
- ✅ HTML/CSS ready in `index.html`
- [ ] Validate username and password fields
- [ ] Display error messages for empty fields
- [ ] Allow login only if both fields are filled
- [ ] Redirect to dashboard on successful validation

### Task 2: Sidebar Toggle (theme.js)
- ✅ HTML/CSS ready in all pages
- [ ] Implement sidebar show/hide for mobile view
- [ ] Toggle CSS classes dynamically
- [ ] Handle overlay clicks

### Task 3: Dynamic Dashboard Cards (dashboard.js)
- ✅ HTML/CSS ready in `dashboard.html`
- [ ] Display dashboard statistics from data array
- [ ] Inject content dynamically
- [ ] Use loops to render cards

### Task 4: Course List Rendering (courses.js)
- ✅ HTML/CSS ready in `courses.html`
- [ ] Store course details in array
- [ ] Dynamically generate course cards
- [ ] Display course status (Active/Completed)
- [ ] Show progress bars

### Task 5: Assignment Status Management (assignments.js)
- ✅ HTML/CSS ready in `assignments.html`
- [ ] Store assignment data in array
- [ ] Display assignments dynamically
- [ ] Change status based on due date
- [ ] Apply conditional styling

### Task 6: Assignment Submission (assignments.js)
- ✅ HTML/CSS ready in `assignments.html`
- [ ] Handle submit button clicks
- [ ] Change status to Submitted
- [ ] Disable submit button after submission
- [ ] Show confirmation message

### Task 7: Profile Edit Mode (profile.js)
- ✅ HTML/CSS ready in `profile.html`
- [ ] Enable input fields on Edit click
- [ ] Save changes and switch to view mode
- [ ] Cancel editing functionality

### Task 8: Theme Switcher (theme.js)
- ✅ HTML/CSS ready in all pages
- [ ] Toggle between light and dark themes
- [ ] Persist theme using localStorage
- [ ] Restore theme on page load

### Task 9: Navigation Active State (all page JS files)
- ✅ HTML/CSS ready with `nav-link` class
- [ ] Highlight active menu item
- [ ] Detect current page URL

### Task 10: Alert & Notification System (all page JS files)
- ✅ HTML/CSS ready with `#alertContainer`
- [ ] Create alert function
- [ ] Display alerts for actions (login, submit, profile update)
- [ ] Auto-hide alerts after few seconds

## 🎨 Design Features

### Color Theme (Forest Green)
- Background: Dark teal to sage green gradient
- Primary: #4f46e5 (Indigo)
- Secondary: #06b6d4 (Cyan)
- Success: #10b981 (Green)
- Danger: #ef4444 (Red)

### Components Included
- ✅ Responsive sidebar navigation
- ✅ Stats cards with hover effects
- ✅ Course cards with progress bars
- ✅ Assignment cards with status badges
- ✅ Profile form with edit mode
- ✅ Alert notifications
- ✅ Theme toggle button
- ✅ Mobile menu toggle

### Responsive Design
- ✅ Desktop layout (sidebar fixed)
- ✅ Tablet layout (adjustable)
- ✅ Mobile layout (collapsible sidebar)

## 🚀 Getting Started

### 1. Open the Project
Simply open `index.html` in a web browser.

### 2. Navigate Through Pages
- Login page: `index.html`
- Dashboard: `dashboard.html`
- Courses: `courses.html`
- Assignments: `assignments.html`
- Profile: `profile.html`

### 3. JavaScript Implementation
Each JavaScript file has:
- Clear task descriptions
- Sample data structures
- Element IDs to interact with
- Requirements and guidelines

Start implementing the tasks in this order:
1. `auth.js` - Login validation
2. `theme.js` - Theme switcher and sidebar toggle
3. `dashboard.js` - Dynamic dashboard
4. `courses.js` - Course rendering
5. `assignments.js` - Assignment management
6. `profile.js` - Profile editing

## 📝 JavaScript Guidelines

### ES6 Syntax Required
```javascript
// Use const/let
const userName = 'John';
let isLoggedIn = false;

// Arrow functions
const validateForm = () => {
  // your code
};

// Array methods
courses.forEach(course => {
  // render course
});
```

### DOM Manipulation
```javascript
// Selection
const element = document.getElementById('elementId');
const elements = document.querySelectorAll('.className');

// Creation
const div = document.createElement('div');
div.className = 'stat-card';
div.innerHTML = `<h3>${title}</h3>`;
parent.appendChild(div);

// Event listeners
button.addEventListener('click', (e) => {
  e.preventDefault();
  // your code
});
```

### localStorage Usage
```javascript
// Save
localStorage.setItem('theme', 'dark');

// Get
const theme = localStorage.getItem('theme');

// Remove
localStorage.removeItem('theme');
```

## 🎯 Success Criteria
- ✅ All HTML pages are complete with proper structure
- ✅ All CSS is organized and responsive
- ⏳ All 10 tasks implemented in JavaScript
- ⏳ No inline JavaScript
- ⏳ ES6 syntax used throughout
- ⏳ Code is modular and well-commented
- ⏳ Application is fully functional without backend

## 📚 Resources
- MDN Web Docs: https://developer.mozilla.org/
- JavaScript.info: https://javascript.info/
- CSS Tricks: https://css-tricks.com/

## 🎓 Learning Outcomes
By completing this project, you will master:
- DOM manipulation and traversal
- Event handling and delegation
- Array and object operations
- Conditional rendering
- localStorage API
- Modular JavaScript architecture
- Responsive web design
- CSS Grid and Flexbox
- UI/UX best practices

Good luck with your implementation! 🚀
