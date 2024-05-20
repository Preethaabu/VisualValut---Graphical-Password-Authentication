const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5500;

// Define MongoDB schema and model
const userSchema = new mongoose.Schema({
    username: String,
    selectedImages: [{ filename: String, id: String }]
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://preethaabu04:12345@cluster0.dagks1r.mongodb.net/VisualVault?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());

// Handle sign-in request
app.post('/signin', async(req, res) => {
    const { username, selectedImages } = req.body;

    try {
        // Create a new user with the provided username and selected images
        const newUser = new User({ username, selectedImages });
        await newUser.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});