document.addEventListener('DOMContentLoaded', function() {

//    const API_URL = 'https://my-auth-test-backend-2.onrender.com/api/auth';


    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const messageDisplay = document.getElementById('message');
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const welcomeUsername = document.getElementById('welcome-username');





document.getElementById('signup-form').addEventListener('submit', async function(e) {
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
            alert('Signup successful!');
            this.reset();
        } else {
            alert(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Could not connect to server');
    }
});










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



//     if (localStorage.getItem('token')) {
//         toggleAuthSections(true);
//     } else {
//         toggleAuthSections(false);
//     }


//     signupForm.addEventListener('submit', async function(e) {
//         e.preventDefault();
//         const username = document.getElementById('signup-username').value;
//         const email = document.getElementById('signup-email').value;
//         const password = document.getElementById('signup-password').value;

//         try {
//             const response = await fetch(`${API_URL}/signup`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, email, password })
//             });

//             const data = await response.json();
//             if (response.ok) { 
//                 displayMessage(data.message, 'success');
//                 signupForm.reset();
            
//             } else {
//                 displayMessage(data.message || 'Signup failed', 'error');
//             }
//         } catch (error) {
//             console.error('Signup fetch error:', error);
//             displayMessage('Could not connect to backend. Please try again.', 'error');
//         }
//     });




// async function handleSignup(event) {
//   event.preventDefault();
  
//   const formData = {
//     username: document.querySelector('[name="username"]').value,
//     email: document.querySelector('[name="email"]').value,
//     password: document.querySelector('[name="password"]').value
//   };

//   try {
//     const response = await fetch('/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     });

//     const data = await response.json();
//     if (response.ok) {
//       alert('Signup successful!');
//     } else {
//       alert(data.message);
//     }
//   } catch (error) {
//     alert('Error during signup');
//     console.error('Error:', error);
//   }
// }


// document.querySelector('form').addEventListener('submit', handleSignup);



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






    // loginForm.addEventListener('submit', async function(e) {
    //     e.preventDefault();
    //     const usernameOrEmail = document.getElementById('login-username-or-email').value;
    //     const password = document.getElementById('login-password').value;

    //     try {
    //         const response = await fetch(`${API_URL}/login`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ usernameOrEmail, password })
    //         });

    //         const data = await response.json();
    //         if (response.ok) { 
    //             localStorage.setItem('token', 'dummy-token-for-test'); 
    //             localStorage.setItem('username', data.username || usernameOrEmail);
    //             displayMessage(data.message, 'success');
    //             loginForm.reset();
    //             toggleAuthSections(true);
    //         } else {
    //             displayMessage(data.message || 'Login failed', 'error');
    //         }
    //     } catch (error) {
    //         console.error('Login fetch error:', error);
    //         displayMessage('Could not connect to backend. Please try again.', 'error');
    //     }
    // });


      function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        displayMessage('Logged out successfully.', 'info');
        toggleAuthSections(false);
    }

    // logoutBtn.addEventListener('click', function() {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('username');
    //     displayMessage('Logged out successfully.', 'info');
    //     toggleAuthSections(false);
    // });




     signupForm.addEventListener('submit', handleSignup);
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
});