// ============================================
// Admin Login JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('rememberMe');
    const errorMessage = document.querySelector('.error-message');
    const successMessage = document.querySelector('.success-message');

    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    // Load saved credentials if "Remember Me" was checked
    if (localStorage.getItem('rememberMe') === 'true') {
        usernameInput.value = localStorage.getItem('savedUsername') || '';
        rememberCheckbox.checked = true;
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Clear error message when user starts typing
    usernameInput.addEventListener('input', clearError);
    passwordInput.addEventListener('input', clearError);

    // Enter key to submit
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});

// ============================================
// Login Handler
// ============================================

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const errorMessage = document.querySelector('.error-message');
    const successMessage = document.querySelector('.success-message');

    // Clear previous messages
    if (errorMessage) errorMessage.style.display = 'none';
    if (successMessage) successMessage.style.display = 'none';

    // Validation
    if (!username || !password) {
        showError('Please enter username and password');
        return;
    }

    // Simulate API call with delay
    showLoadingState(true);

    setTimeout(function() {
        // Hardcoded credentials for demo
        const validUsername = 'admin';
        const validPassword = 'admin123';

        if (username === validUsername && password === validPassword) {
            // Login successful
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            localStorage.setItem('loginTime', new Date().toISOString());

            // Handle "Remember Me"
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('savedUsername', username);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('savedUsername');
            }

            // Show success message
            if (successMessage) {
                successMessage.textContent = 'Login successful! Redirecting...';
                successMessage.style.display = 'block';
            }

            // Redirect to dashboard
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Login failed
            showError('Invalid username or password');
            showLoadingState(false);

            // Clear password field
            document.getElementById('password').value = '';
            document.getElementById('username').focus();
        }
    }, 1500);
}

// ============================================
// Error/Success Messages
// ============================================

function showError(message) {
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.setAttribute('role', 'alert');
    }
}

function clearError() {
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

// ============================================
// Loading State
// ============================================

function showLoadingState(isLoading) {
    const loginBtn = document.querySelector('.login-btn');
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');

    if (isLoading) {
        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<span class="spinner"></span> Logging in...';
        }
        inputs.forEach(input => input.disabled = true);
    } else {
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.innerHTML = 'Login';
        }
        inputs.forEach(input => input.disabled = false);
    }
}

// ============================================
// Password visibility toggle
// ============================================

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// ============================================
// Demo credentials helper
// ============================================

function fillDemoCredentials() {
    document.getElementById('username').value = 'admin';
    document.getElementById('password').value = 'admin123';
    document.getElementById('username').focus();
}
