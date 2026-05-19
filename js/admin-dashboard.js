// ============================================
// Admin Dashboard JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if logged in
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Set admin name
    const adminUsername = localStorage.getItem('adminUsername') || 'Admin User';
    document.getElementById('adminName').textContent = adminUsername.charAt(0).toUpperCase() + adminUsername.slice(1);

    // Setup navigation
    setupNavigation();

    // Setup modals
    setupModals();

    // Setup logout
    setupLogout();

    // Setup sidebar toggle for mobile
    setupSidebarToggle();
});

// ============================================
// Navigation Setup
// ============================================

function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the section ID
            const sectionId = this.getAttribute('data-section');

            // Remove active class from all items and sections
            menuItems.forEach(m => m.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked item and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                document.getElementById('pageTitle').textContent = 
                    this.textContent.trim().split('\n')[0];
            }
        });
    });
}

// ============================================
// Modals Setup
// ============================================

function setupModals() {
    // Add Tool
    const addToolBtn = document.getElementById('addToolBtn');
    const toolModal = document.getElementById('toolModal');
    const toolForm = document.querySelector('.tool-form');
    
    if (addToolBtn) {
        addToolBtn.addEventListener('click', function() {
            toolModal.classList.add('active');
        });
    }

    // Add Driver
    const addDriverBtn = document.getElementById('addDriverBtn');
    const driverModal = document.getElementById('driverModal');
    const driverForm = document.querySelector('.driver-form');
    
    if (addDriverBtn) {
        addDriverBtn.addEventListener('click', function() {
            driverModal.classList.add('active');
        });
    }

    // Add Job
    const addJobBtn = document.getElementById('addJobBtn');
    const jobModal = document.getElementById('jobModal');
    const jobForm = document.querySelector('.job-form');
    
    if (addJobBtn) {
        addJobBtn.addEventListener('click', function() {
            jobModal.classList.add('active');
        });
    }

    // Close buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Cancel buttons
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Form submissions
    if (toolForm) {
        toolForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Tool added successfully!');
            toolModal.classList.remove('active');
            this.reset();
        });
    }

    if (driverForm) {
        driverForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Driver added successfully!');
            driverModal.classList.remove('active');
            this.reset();
        });
    }

    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Job posted successfully!');
            jobModal.classList.remove('active');
            this.reset();
        });
    }
}

// ============================================
// Logout Setup
// ============================================

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('adminLoggedIn');
                localStorage.removeItem('adminUsername');
                localStorage.removeItem('loginTime');
                window.location.href = 'login.html';
            }
        });
    }
}

// ============================================
// Sidebar Toggle for Mobile
// ============================================

function setupSidebarToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when menu item is clicked
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            });
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// ============================================
// Table Edit/Delete Actions
// ============================================

document.addEventListener('click', function(e) {
    // Edit actions
    if (e.target.closest('.btn-edit')) {
        const row = e.target.closest('tr') || e.target.closest('.job-item') || e.target.closest('.message-card');
        if (row) {
            alert('Edit functionality would be implemented here');
        }
    }

    // Delete actions
    if (e.target.closest('.btn-delete')) {
        if (confirm('Are you sure you want to delete this item?')) {
            const row = e.target.closest('tr') || e.target.closest('.job-item');
            if (row) {
                row.style.opacity = '0';
                setTimeout(() => {
                    row.remove();
                    alert('Item deleted successfully!');
                }, 300);
            }
        }
    }

    // View actions
    if (e.target.closest('.btn-view')) {
        alert('View functionality would be implemented here');
    }

    // Reply actions
    if (e.target.closest('.btn-reply')) {
        alert('Reply functionality would be implemented here');
    }
});

// ============================================
// Search Functionality
// ============================================

const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('.data-table tbody tr');

        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// ============================================
// Form Validation
// ============================================

document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('tool-form') || 
        e.target.classList.contains('driver-form') ||
        e.target.classList.contains('job-form')) {
        
        const inputs = e.target.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#E74C3C';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields');
        }
    }
});

// Clear validation styling on input
document.addEventListener('input', function(e) {
    if (e.target.matches('input[required], textarea[required], select[required]')) {
        if (e.target.value.trim()) {
            e.target.style.borderColor = '';
        }
    }
});

// ============================================
// Time Display
// ============================================

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    // You can display this in the topbar if needed
}

setInterval(updateTime, 1000);

// ============================================
// Print functionality
// ============================================

function printTable() {
    const table = document.querySelector('.data-table');
    if (table) {
        const printWindow = window.open('', '', 'width=900,height=600');
        printWindow.document.write(table.outerHTML);
        printWindow.print();
    }
}
