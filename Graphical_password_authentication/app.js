// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://preethaabu04:12345@cluster0.dagks1r.mongodb.net/VisualVault?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Define User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  selectedImages: [String],
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, selectedImages } = req.body;
    const newUser = new User({ username, selectedImages });
    await newUser.save();
    res.status(201).send('User created successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, selectedImages } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    if (JSON.stringify(selectedImages) === JSON.stringify(user.selectedImages)) {
      res.status(200).send('Login successful.');
    } else {
      res.status(401).send('Login failed. Selected images do not match.');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
