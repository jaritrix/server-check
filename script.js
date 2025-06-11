document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const messageDisplay = document.getElementById('message');
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const welcomeUsername = document.getElementById('welcome-username');

    function displayMessage(message, type = 'info') {
        messageDisplay.textContent = message;
        messageDisplay.className = `info-message ${type}`;
    }

    function toggleAuthSections(loggedIn, username = '') {
        if (loggedIn) {
            authSection.style.display = 'none';
            dashboardSection.style.display = 'block';
            welcomeUsername.textContent = username || 'User';
        } else {
            authSection.style.display = 'block';
            dashboardSection.style.display = 'none';
        }
        displayMessage('');
    }

    toggleAuthSections(false); // always show login/signup on reload

    async function handleSignup(e) {
        e.preventDefault();

        const formData = {
            username: document.getElementById('signup-username').value,
            email: document.getElementById('signup-email').value,
            password: document.getElementById('signup-password').value
        };

        try {
        const response = await fetch('http://localhost:3000/signup', {
, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                displayMessage('Signup successful!', 'success');
                signupForm.reset();
            } else {
                displayMessage(data.message || 'Signup failed', 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            displayMessage('Could not connect to server. Please try again.', 'error');
        }
    }

    async function handleLogin(e) {
        e.preventDefault();

        const formData = {
            usernameOrEmail: document.getElementById('login-username-or-email').value,
            password: document.getElementById('login-password').value
        };

        try {
       const response = await fetch('http://localhost:3000/login', {
, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                displayMessage('Login successful!', 'success');
                loginForm.reset();
                toggleAuthSections(true, data.username || formData.usernameOrEmail);
            } else {
                displayMessage(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            displayMessage('Could not connect to server. Please try again.', 'error');
        }
    }

    function handleLogout() {
        displayMessage('Logged out successfully.', 'info');
        toggleAuthSections(false);
    }

    signupForm.addEventListener('submit', handleSignup);
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
});
