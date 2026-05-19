// ============================================
// Main Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavigation();
    setupScrollToTop();
    setupForms();
    setupFilters();
    setupDownloadButtons();
    setupScrolled();
}

// ============================================
// Navigation Setup
// ============================================

function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// Scroll to Top Button
// ============================================

function setupScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// Scroll Effect on Navbar
// ============================================

function setupScrolled() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// Form Handlers
// ============================================

function setupForms() {
    // IMEI Unlock Form
    const imeiForm = document.getElementById('imeiForm');
    if (imeiForm) {
        imeiForm.addEventListener('submit', handleIMEIUnlock);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleIMEIUnlock(e) {
    e.preventDefault();

    const imei = document.getElementById('imei').value;
    const brand = document.getElementById('deviceBrand').value;
    const carrier = document.getElementById('carrier').value;

    // Validate IMEI format (15 digits)
    if (!/^\d{15}$/.test(imei)) {
        showNotification('Please enter a valid 15-digit IMEI number', 'error');
        return;
    }

    // Show loading state
    const submitBtn = imeiForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    // Simulate API call
    setTimeout(() => {
        // Generate mock unlock code
        const unlockCode = Math.random().toString().substr(2, 8).toUpperCase();

        displayUnlockResult({
            imei: imei,
            brand: brand,
            carrier: carrier,
            unlockCode: unlockCode,
            timestamp: new Date().toLocaleString()
        });

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        showNotification('Unlock code generated successfully!', 'success');
    }, 2000);
}

function displayUnlockResult(result) {
    const resultContainer = document.getElementById('unlockResult');
    
    resultContainer.innerHTML = `
        <div class="unlock-result-box" style="margin-top: 2rem;">
            <h3><i class="fas fa-check-circle"></i> Unlock Code Generated</h3>
            
            <div class="result-details">
                <p><strong>Device:</strong> ${result.brand.toUpperCase()}</p>
                <p><strong>IMEI:</strong> ${result.imei}</p>
                <p><strong>Carrier:</strong> ${result.carrier.toUpperCase()}</p>
                <p><strong>Generated:</strong> ${result.timestamp}</p>
            </div>

            <div class="unlock-code-box">
                <p><strong>Your Unlock Code:</strong></p>
                <div class="code-display">
                    <div class="code" id="codeDisplay">${result.unlockCode}</div>
                    <button type="button" class="btn-copy" onclick="copyUnlockCode()">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>

            <p style="font-size: 0.9rem; color: #666; margin-top: 1rem;">
                <strong>Note:</strong> This unlock code will work on your device for 7 days from generation. 
                Follow the instructions provided to activate the unlock.
            </p>
        </div>
    `;

    resultContainer.style.display = 'block';
}

function copyUnlockCode() {
    const codeDisplay = document.getElementById('codeDisplay');
    const code = codeDisplay.textContent;

    navigator.clipboard.writeText(code).then(() => {
        showNotification('Unlock code copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function handleContactForm(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Save to local storage
    const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    contactMessages.push({
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString(),
        status: 'new'
    });
    localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

    showNotification('Thank you! Your message has been sent successfully. We will respond within 24 hours.', 'success');

    // Reset form
    e.target.reset();
}

// ============================================
// Filter Buttons
// ============================================

function setupFilters() {
    // Tool filters
    const toolFilters = document.querySelectorAll('.filter-btn');
    toolFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterTools(filter);

            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Driver filters
    const driverFilters = document.querySelectorAll('.driver-filter-btn');
    driverFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-brand');
            filterDrivers(filter);

            // Update active button
            document.querySelectorAll('.driver-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterTools(category) {
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('animate-in');
            }, 10);
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-in');
        }
    });
}

function filterDrivers(brand) {
    const driverCards = document.querySelectorAll('.driver-card');

    driverCards.forEach(card => {
        if (brand === 'all' || card.getAttribute('data-brand') === brand) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('animate-in');
            }, 10);
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-in');
        }
    });
}

// ============================================
// Download Buttons
// ============================================

function setupDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const toolName = this.getAttribute('data-tool');
            handleDownload(toolName);
        });
    });
}

function handleDownload(toolName) {
    // Track download
    const downloads = JSON.parse(localStorage.getItem('downloads') || '{}');
    downloads[toolName] = (downloads[toolName] || 0) + 1;
    localStorage.setItem('downloads', JSON.stringify(downloads));

    showNotification(`${toolName} download started! Check your downloads folder.`, 'success');

    // In a real application, this would trigger an actual download
    // window.location.href = '/downloads/' + toolName + '.zip';
}

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} show`;

    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';

    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// Intersection Observer for Animations
// ============================================

if (window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.tool-card, .driver-card, .job-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Smooth Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Form Validation on Input
// ============================================

const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '';
        }
    });
});

// ============================================
// IMEI Input Formatting
// ============================================

const imeiInput = document.getElementById('imei');
if (imeiInput) {
    imeiInput.addEventListener('input', function() {
        // Only allow numbers
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Limit to 15 digits
        if (this.value.length > 15) {
            this.value = this.value.slice(0, 15);
        }
    });
}

// ============================================
// Track Page Views
// ============================================

function trackPageView() {
    const pageViews = parseInt(localStorage.getItem('pageViews') || '0') + 1;
    localStorage.setItem('pageViews', pageViews);
    localStorage.setItem('lastVisit', new Date().toLocaleString());
}

trackPageView();

// ============================================
// Utility Functions
// ============================================

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format time
function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Console API Info
console.log('%c PhoneUnlock Pro ', 'background: #2E86AB; color: white; font-weight: bold; padding: 5px 10px; border-radius: 3px;');
console.log('%c Professional Device Unlocking Solutions ', 'font-style: italic; color: #2E86AB;');
console.log('%c Version 1.0.0 | © 2024 ', 'color: #7F8C8D; font-size: 12px;');
