require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path')
const User = require('./User');
const PORT = process.env.PORT || 4000;
const authRoutes = require('./auth');
app.use(cors());
app.use('/api/auth', authRoutes);
app.use(express.static('./'));
app.use(express.json());
const MongoDB_URI = process.env.MongoDB_URI;

// const authRoutes = require('./auth'); 
mongoose.connect(MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


  app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Create new user using your User model
    const newUser = new User({
      username,
      email,
      password
    });

    // Save user to database
    await newUser.save();
    
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Start server
app.listen(4000, () => {
  console.log('Server running on port 4000');
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI, {
      useNewUrlParser: true,      
      useUnifiedTopology: true,  
    });
    console.log("MongoDB Connected Successfully!");

  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  };
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server because of MongoDB connection error.");
  });



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // <-- Yeh line add karein
});




app.get('./', (req, res, next) => {
    res.type('text/css');
    next();
});

app.get('./', (req, res, next) => {
    res.type('text/javascript');
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('<h1>Simple Auth Backend API is Running!</h1><p>Use /api/auth/signup and /api/auth/login endpoints.</p>');
});



// app.get("/", (req, res) => {
//   res.send("Hello, World! bhai gaurav");
// });

// app.get('/run', (req, res) => {
//   res.send("i am fine and what u doing");
// });

// app.get("/login", (req, res) => {
//   res.send("login page");
// });
