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

    function toggleAuthSections(loggedIn) {
        if (loggedIn) {
            authSection.style.display = 'none';
            dashboardSection.style.display = 'block';
            welcomeUsername.textContent = localStorage.getItem('username') || 'User';
        } else {
            authSection.style.display = 'block';
            dashboardSection.style.display = 'none';
        }
        displayMessage('');
    }

    toggleAuthSections(!!localStorage.getItem('token'));

    async function handleSignup(e) {
        e.preventDefault();

        const formData = {
            username: document.getElementById('signup-username').value,
            email: document.getElementById('signup-email').value,
            password: document.getElementById('signup-password').value
        };

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username || formData.usernameOrEmail);
                displayMessage('Login successful!', 'success');
                loginForm.reset();
                toggleAuthSections(true);
            } else {
                displayMessage(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            displayMessage('Could not connect to server. Please try again.', 'error');
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        displayMessage('Logged out successfully.', 'info');
        toggleAuthSections(false);
    }

    signupForm.addEventListener('submit', handleSignup);
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
});
