const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const DATA_FILE = './data.json';
const fs = require('fs'); // Import the File System module

app.use(cors()); // Allows your HTML to talk to this server
app.use(express.json());

const loadUsers = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            // Create the file with an empty array if it doesn't exist
            fs.writeFileSync(DATA_FILE, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data.json:", error);
        return [];
    }
};

// Helper function to save users to the JSON file
const saveUsers = (users) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing to data.json:", error);
    }
};

// Create Account Route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers(); // Load current users from file

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: "Username already taken, please try something else." });
    }

    users.push({ username, password });
    saveUsers(users); // Save updated list back to file

    res.status(201).json({ message: "Account created successfully!" });
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers(); // Load current users from file

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password." });
    }

    res.status(200).json({ message: "Login successful!", user: username });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});