// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Find and activate the corresponding nav link based on page
    const navMapping = {
        'home': 'Home',
        'discover': 'Discover',
        'goals': 'My Goals',
        'plan': 'My Plan',
        'progress': 'Progress',
        'login': 'Login'
    };

    const pageName = navMapping[pageId];
    if (pageName) {
        const activeLink = Array.from(document.querySelectorAll('.nav-link')).find(link => 
            link.textContent.trim() === pageName
        );
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filter Toggle Function
function toggleFilter(filterId) {
    const filterOptions = document.getElementById(filterId);
    const filterSection = filterOptions.closest('.filter-section');

    if (filterOptions.style.display === 'none') {
        filterOptions.style.display = 'flex';
        filterSection.classList.remove('collapsed');
    } else {
        filterOptions.style.display = 'none';
        filterSection.classList.add('collapsed');
    }
}

// Rating Slider Update
function updateRatingValue() {
    const slider = document.getElementById('ratingSlider');
    const value = document.getElementById('ratingValue');
    if (slider && value) {
        value.textContent = slider.value;
    }
}

// Session Duration Slider Update
function updateSessionValue() {
    const slider = document.getElementById('sessionSlider');
    const value = document.getElementById('sessionValue');
    if (slider && value) {
        value.textContent = slider.value + ' min';
    }
}

// Show Rating Info
function showRatingInfo() {
    alert(
        'Chess Rating Levels Explained\n\n' +
        'BEGINNER (1000-1400)\n' +
        'Learning basic tactics and openings.\n' +
        'Understanding piece values and simple endgames.\n\n' +
        'INTERMEDIATE (1400-1800)\n' +
        'Developing strategic thinking.\n' +
        'Studying common patterns and middlegame plans.\n\n' +
        'ADVANCED (1800-2200)\n' +
        'Deep tactical and positional understanding.\n' +
        'Strong opening preparation and endgame technique.\n\n' +
        '🔴EXPERT (2200+)\n' +
        'Master level play.\n' +
        'Candidate Master, Master, or higher titles.\n\n'
    );
}

// Duration Control Functions for Goals Page
function updateDuration(value) {
    const durationValue = document.getElementById('durationValue');
    const durationSlider = document.getElementById('durationSlider');

    if (durationValue) {
        durationValue.textContent = value;
    }
    if (durationSlider) {
        durationSlider.value = value;
    }
}

function changeDuration(delta) {
    const slider = document.getElementById('durationSlider');
    if (!slider) return;

    let currentValue = parseInt(slider.value);
    let newValue = currentValue + delta;

    // Ensure value stays within bounds
    newValue = Math.max(5, Math.min(60, newValue));

    // Round to nearest 5
    newValue = Math.round(newValue / 5) * 5;

    updateDuration(newValue);
}

// Form Submission Handler for Goals
function handleGoalSubmit(event) {
    event.preventDefault();

    // Get form values
    const theme = document.getElementById('themeSelect')?.value;
    const targetDate = document.getElementById('targetDate')?.value;
    const ratingLevel = document.getElementById('ratingLevel')?.value;
    const duration = document.getElementById('durationValue')?.textContent;

    // Get display names
    const themeSelect = document.getElementById('themeSelect');
    const themeName = themeSelect.options[themeSelect.selectedIndex].text;
    const ratingSelect = document.getElementById('ratingLevel');
    const ratingName = ratingSelect.options[ratingSelect.selectedIndex].text;

    console.log('Goal Created:', {
        theme,
        targetDate,
        ratingLevel,
        duration: duration + ' min'
    });

    // Format date
    const dateObj = new Date(targetDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // Show success message
    alert(
        '🎯 Goal Created Successfully!\n\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        'Theme: ' + themeName + '\n' +
        'Target Date: ' + formattedDate + '\n' +
        'Rating Level: ' + ratingName + '\n' +
        'Daily Practice: ' + duration + ' minutes\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        'Your goal has been added!\n' +
        'Keep practicing to achieve it! ♟'
    );

    // Reset form
    document.querySelector('.goal-form-main').reset();
    updateDuration(15);

    // Navigate to home
    setTimeout(() => {
        showPage('home');
    }, 500);
}

// Login Form Handler
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    const rememberMe = document.getElementById('rememberMe')?.checked;

    console.log('Login attempt:', {
        email,
        rememberMe
    });

    // Simple validation
    if (!email || !password) {
        alert('⚠️ Please fill in all required fields!');
        return;
    }

    // Show success message
    alert(
        '✅ Login Successful!\n\n' +
        'Welcome back, ' + email.split('@')[0] + '!\n\n' +
        'Redirecting to your dashboard...'
    );

    // Redirect to home page
    setTimeout(() => {
        showPage('home');
    }, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('♟ Chess Learning Platform Initialized');
    console.log('Redesigned Discover page with filters active!');

    // Set home page as active by default
    showPage('home');

    // Add click handlers to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const pageId = href.substring(1);
                showPage(pageId);
            }
        });
    });

// Add interactivity to practice cards (no alert, just navigate)
document.querySelectorAll('.practice-card-discover').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.card-title')?.textContent;
        console.log('Practice card clicked:', title);
        // No alert - just let the onclick handler navigate to video detail
    });
});


    // Add interactivity to card action buttons
    document.querySelectorAll('.btn-card-action').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = this.closest('.practice-card-discover')?.querySelector('.card-title')?.textContent;
            console.log('Action button clicked for:', title);
        });
    });

    // Filter checkbox handlers
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            e.stopPropagation();
            const label = this.closest('.filter-option');
            const filterName = label.textContent.trim();
            console.log('Filter changed:', filterName, 'checked:', this.checked);

            // In a real app, this would filter the results
            updateResultCount();
        });
    });

    // Plan card buttons
    document.querySelectorAll('.btn-continue, .btn-start').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const lessonName = this.closest('.plan-card')?.querySelector('h3')?.textContent;
            console.log('Starting lesson:', lessonName);
            alert('📚 Starting lesson:\n' + lessonName + '\n\nLesson interface would load here.');
        });
    });

    // Practice buttons
    document.querySelectorAll('.btn-practice').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const practiceType = this.closest('.practice-card')?.querySelector('h4')?.textContent;
            console.log('Starting practice:', practiceType);
            alert('💪 Starting practice:\n' + practiceType + '\n\nPractice session would begin here.');
        });
    });

    // Add to Plan buttons
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', function() {
            const courseName = this.closest('.recommended-card')?.querySelector('h4')?.textContent;
            console.log('Adding to plan:', courseName);
            this.textContent = '✓ Added';
            this.style.background = '#45a049';
            setTimeout(() => {
                alert('✓ "' + courseName + '" has been added to your plan!');
            }, 200);
        });
    });

    // Update slider value display for goals page
    const durationSlider = document.getElementById('durationSlider');
    if (durationSlider) {
        durationSlider.addEventListener('input', function() {
            updateDuration(this.value);
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Submit form with Ctrl/Cmd + Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const goalForm = document.querySelector('.goal-form-main');
            const loginForm = document.querySelector('.login-form');

            if (goalForm && document.getElementById('goals').classList.contains('active')) {
                goalForm.dispatchEvent(new Event('submit'));
            } else if (loginForm && document.getElementById('login').classList.contains('active')) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }

        // Quick navigation with number keys
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    showPage('home');
                    break;
                case '2':
                    showPage('discover');
                    break;
                case '3':
                    showPage('goals');
                    break;
                case '4':
                    showPage('plan');
                    break;
                case '5':
                    showPage('progress');
                    break;
                case '6':
                    showPage('login');
                    break;
            }
        }
    });
});

// Update result count based on filters
function updateResultCount() {
    const resultCount = document.querySelector('.result-count');
    if (resultCount) {
        // Count checked filters
        const checkedFilters = document.querySelectorAll('.filter-option input[type="checkbox"]:checked').length;
        const totalResults = Math.max(10, checkedFilters * 12);

        resultCount.textContent = totalResults + ' × ' + checkedFilters;
    }
}

// Form validation feedback
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.goal-form-main, .login-form');
    forms.forEach(form => {
        if (form) {
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('invalid', function(e) {
                    e.preventDefault();
                    this.style.borderColor = '#d94545';
                    setTimeout(() => {
                        this.style.borderColor = '#333';
                    }, 2000);
                });

                input.addEventListener('input', function() {
                    if (this.validity.valid) {
                        this.style.borderColor = '#4caf50';
                        setTimeout(() => {
                            this.style.borderColor = '#333';
                        }, 1000);
                    }
                });
            });
        }
    });
});

// Add hover effects to duration buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Console welcome message
console.log('%c♟ Unlock the 64 Squares', 'font-size: 24px; font-weight: bold; color: #5b9bd5;');
console.log('%cChess Learning Platform - Redesigned', 'font-size: 16px; color: #888;');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Available Pages:');
console.log('  • Home (Landing)');
console.log('  • Discover (With Filters)');
console.log('  • My Goals (Create Goal)');
console.log('  • My Plan');
console.log('  • Progress');
console.log('  • Login');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Quick Navigation: Alt + 1-6 for pages');
console.log('Keyboard: Ctrl/Cmd + Enter to submit forms');
// Open Video Detail Page
function openVideoDetail(title, level, duration, category, description) {
    // Update video detail page content
    document.getElementById('videoTitleMain').textContent = title;
    document.getElementById('videoDescriptionFull').textContent = description;
    document.getElementById('videoLevelBadge').textContent = level;
    document.getElementById('videoDurationBadge').textContent = '⏱ ' + duration;
    document.getElementById('videoCategoryBreadcrumb').textContent = category;
    
    // Show video detail page
    showPage('video-detail');
    
    console.log('Opening video:', title);
}

// Load Video (for clicking on related videos or suggestions)
function loadVideo(title, level, duration, category, description) {
    openVideoDetail(title, level, duration, category, description);
}

function openInteractiveDetail(title, level, duration, category, description, exercises) { ... }
function loadInteractive(title, level, duration, category, description, exercises) { ... }
function openBlogDetail(title, level, duration, category, content) { ... }
function loadArticle(title, level, duration, category, description) { ... }
