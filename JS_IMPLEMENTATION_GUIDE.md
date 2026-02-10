# JavaScript Implementation Guide

## Quick Reference for All Tasks

### Task 1: Login Validation (auth.js)
**File:** `index.html` → `js/auth.js`

**Elements:**
- `#loginForm` - Form element
- `#username` - Username input
- `#password` - Password input
- `#usernameError` - Error message span
- `#passwordError` - Error message span
- `#loginButton` - Submit button

**Implementation Steps:**
1. Add event listener to form submit
2. Prevent default form submission
3. Get input values
4. Validate inputs (check if empty)
5. Show/hide error messages
6. If valid, redirect to `dashboard.html`
7. Optional: Store username in localStorage

**Example Structure:**
```javascript
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Get values
    // Validate
    // Show errors or redirect
});
```

---

### Task 2: Sidebar Toggle (theme.js)
**Files:** All pages → `js/theme.js`

**Elements:**
- `#menuToggle` - Menu button
- `#sidebar` - Sidebar element
- `#sidebarOverlay` - Overlay for mobile

**Implementation Steps:**
1. Add click listener to menu toggle button
2. Toggle 'active' class on sidebar
3. Toggle 'active' class on overlay
4. Add click listener to overlay to close sidebar

**CSS Classes:**
- `.sidebar.active` - Shows sidebar on mobile
- `.sidebar-overlay.active` - Shows overlay

---

### Task 3: Dynamic Dashboard Cards (dashboard.js)
**File:** `dashboard.html` → `js/dashboard.js`

**Elements:**
- `#statsGrid` - Container for stat cards
- `#assignmentsPreview` - Container for assignments
- `#userName` - User name display

**Data Provided:**
- `dashboardStats` array - 4 stat objects
- `upcomingAssignments` array - Assignment objects

**Implementation Steps:**
1. Loop through `dashboardStats` array
2. For each stat, create a div with class `stat-card`
3. Set innerHTML with stat data
4. Append to `#statsGrid`
5. Loop through `upcomingAssignments`
6. Create assignment items
7. Append to `#assignmentsPreview`

**HTML Structure to Create:**
```html
<div class="stat-card">
    <h3>TITLE</h3>
    <div class="stat-value">VALUE</div>
    <div class="stat-label">LABEL</div>
</div>
```

---

### Task 4: Course List Rendering (courses.js)
**File:** `courses.html` → `js/courses.js`

**Elements:**
- `#courseGrid` - Container for course cards

**Data Provided:**
- `courses` array - 6 course objects

**Implementation Steps:**
1. Loop through courses array
2. Create course card element
3. Add conditional class for status
4. Calculate progress bar width
5. Append to courseGrid

**HTML Structure to Create:**
```html
<div class="course-card">
    <div class="course-header">
        <h3>Course Name</h3>
        <p>Course Code - Instructor</p>
    </div>
    <div class="course-body">
        <div class="course-info">
            <span>Credits: X</span>
            <span class="course-status active/completed">STATUS</span>
        </div>
        <div class="course-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: X%"></div>
            </div>
        </div>
    </div>
</div>
```

---

### Task 5: Assignment Status Management (assignments.js)
**File:** `assignments.html` → `js/assignments.js`

**Elements:**
- `#assignmentsList` - Container for assignment cards

**Data Provided:**
- `assignments` array - 5 assignment objects

**Implementation Steps:**
1. Loop through assignments array
2. Check due date vs today's date
3. Determine status (pending/late/submitted)
4. Create assignment card with appropriate classes
5. Add submit button (conditionally disabled)
6. Append to assignmentsList

**Status Logic:**
- If status is 'submitted' → show as submitted, disable button
- If status is 'late' → show as late
- If status is 'pending' → show as pending

---

### Task 6: Assignment Submission (assignments.js)
**File:** `assignments.html` → `js/assignments.js`

**Elements:**
- `.submit-btn` - Submit buttons (created dynamically)

**Implementation Steps:**
1. When creating assignment cards, add click listener to submit button
2. On click:
   - Change status badge to 'submitted'
   - Disable the button
   - Show success alert
   - Update card styling

**HTML for Assignment Card:**
```html
<div class="assignment-card">
    <div class="assignment-details">
        <h3>Title</h3>
        <div class="assignment-meta">
            <span class="assignment-course">Course</span>
            <span class="assignment-due">Due: Date</span>
        </div>
    </div>
    <div class="assignment-actions">
        <span class="assignment-status STATUS">STATUS</span>
        <button class="submit-btn" data-id="ID">Submit</button>
    </div>
</div>
```

---

### Task 7: Profile Edit Mode (profile.js)
**File:** `profile.html` → `js/profile.js`

**Elements:**
- `#profileForm` - Form element
- `#editButton` - Edit button
- `#saveButton` - Save button
- `#cancelButton` - Cancel button
- All input fields: `#fullName`, `#email`, `#studentId`, `#department`, `#phone`, `#year`

**Implementation Steps:**
1. Add click listener to Edit button:
   - Enable all input fields (remove disabled attribute)
   - Hide Edit button
   - Show Save and Cancel buttons
2. Add click listener to Save button:
   - Get all input values
   - Update profile display
   - Disable all inputs
   - Show Edit button, hide Save/Cancel
   - Show success alert
3. Add click listener to Cancel button:
   - Reset inputs to original values
   - Disable all inputs
   - Show Edit button, hide Save/Cancel

---

### Task 8: Theme Switcher (theme.js)
**Files:** All pages → `js/theme.js`

**Elements:**
- `#themeToggle` - Theme button
- `body` - Body element

**Implementation Steps:**
1. On page load:
   - Check localStorage for saved theme
   - If 'dark', add 'dark-mode' class to body
   - Update button icon
2. Add click listener to theme toggle:
   - Toggle 'dark-mode' class on body
   - Update button icon (🌙 ↔ ☀️)
   - Save theme to localStorage

**localStorage Keys:**
- `theme` - Value: 'light' or 'dark'

---

### Task 9: Navigation Active State
**Files:** All page JS files

**Elements:**
- `.nav-link` - Navigation links
- `data-page` attribute - Page identifier

**Implementation Steps:**
1. Get current page name from URL
2. Query all nav links
3. Remove 'active' class from all
4. Add 'active' class to matching link

**Example:**
```javascript
const currentPage = 'dashboard'; // or detect from URL
document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === currentPage) {
        link.classList.add('active');
    }
});
```

---

### Task 10: Alert System
**Files:** All page JS files

**Element:**
- `#alertContainer` - Container for alerts

**Implementation Steps:**
1. Create a function `showAlert(message, type)`
2. Create alert div with appropriate class
3. Set message content
4. Append to alertContainer
5. Use setTimeout to auto-hide after 3 seconds

**Alert Types:**
- `success` - Green (for successful actions)
- `error` - Red (for errors)
- `info` - Blue (for information)

**HTML Structure:**
```html
<div class="alert success">
    <span>Message here</span>
</div>
```

**Usage Examples:**
- Login success: `showAlert('Login successful!', 'success')`
- Assignment submitted: `showAlert('Assignment submitted successfully!', 'success')`
- Profile updated: `showAlert('Profile updated successfully!', 'success')`
- Error: `showAlert('Please fill all fields', 'error')`

---

## Common Functions (Available in utils.js)

If you include `utils.js`, you can use:
- `showAlert(message, type, duration)`
- `formatDate(dateString)`
- `isPastDue(dueDate)`
- `getDaysUntilDue(dueDate)`
- `setActiveNav(currentPage)`
- `getStoredUsername()`
- `storeUsername(username)`
- `initSidebarToggle()`
- `initThemeToggle()`

---

## Testing Checklist

### Login Page (index.html)
- [ ] Empty username shows error
- [ ] Empty password shows error
- [ ] Valid inputs redirect to dashboard
- [ ] Username is stored

### Dashboard (dashboard.html)
- [ ] 4 stat cards display correctly
- [ ] Assignment previews show
- [ ] Username displays from localStorage
- [ ] Navigation is highlighted
- [ ] Theme toggle works
- [ ] Sidebar toggle works (mobile)

### Courses (courses.html)
- [ ] 6 courses display
- [ ] Active/Completed status shows correctly
- [ ] Progress bars render with correct width
- [ ] Cards are responsive

### Assignments (assignments.html)
- [ ] All assignments display
- [ ] Status colors are correct
- [ ] Submit button works
- [ ] Button disables after submit
- [ ] Alert shows on submit
- [ ] Late assignments show as late

### Profile (profile.html)
- [ ] Edit button enables fields
- [ ] Save button updates and disables fields
- [ ] Cancel button resets changes
- [ ] Alert shows on save
- [ ] Profile avatar shows first letter

### Theme & Navigation (all pages)
- [ ] Theme persists across pages
- [ ] Active nav link is highlighted
- [ ] Sidebar toggles on mobile
- [ ] All links work correctly

---

## Tips & Best Practices

1. **Use `const` and `let`** - No `var`
2. **Arrow functions** - Use modern syntax
3. **Template literals** - Use backticks for HTML strings
4. **Event delegation** - For dynamically created elements
5. **DRY principle** - Don't repeat code
6. **Comments** - Explain complex logic
7. **Console.log** - Debug your code
8. **Test frequently** - Test each function as you build

Good luck! 🚀
