const express = require('express');
const router = express.Router();
const User = require('./User');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
      console.log('Received signup request with body:', req.body);

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        let user = await User.findOne({ $or: [{ username }, { email }] });
         console.log('User found during findOne:', user);
        if (user) {
            return res.status(409).json({ message: 'Username or Email already exists.' });
        }
        user = new User({
             username, 
             email, 
             password });

console.log('Backend: Attempting to save new user:', newUser);

        await user.save();

 console.log('Backend: User saved successfully:', newUser.username);

        res.status(201).json({ message: 'Signup successful!' });

    } catch (err) {
        console.error('Backend: Error during signup process:', err.message);
        
        res.status(500).send('Server Error during signup.');
    }
      if (err.code === 11000) {
            return res.status(409).json({ message: 'Username or Email already exists.' });
        }
        res.status(500).json({ message: 'Server Error during signup.', error: err.message });
});


router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    console.log('Backend: Received login request with body:', req.body);

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ message: 'Please enter both username/email and password.' });
    }

    try {
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            password: password 
        });

        console.log('Backend: User found during login attempt:', user ? user.username : 'None');

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid Credentials.' });
        }

        console.log('Backend: Login successful for user:', user.username);
        res.status(200).json({ message: 'Login successful!', username: user.username });

    } catch (err) {
        console.error('Backend: Error during login process:', err.message);
        res.status(500).json({ message: 'Server Error during login.', error: err.message });
    }
});

module.exports = router;











        
//         if (user) {
//             res.status(200).json({ message: 'Login successful!', username: user.username });
//         } else {
//             res.status(401).json({ message: 'Invalid Credentials.' });
//         }

//     } catch (err) {
//         console.error('Login error:', err.message);
//         res.status(500).send('Server Error during login.');
//     }
// });

// module.exports = router;