// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let projects = []; // In-memory storage for projects

// Serve the index.html file from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to handle project submissions
app.post('/api/projects', (req, res) => {
    const { title, description, githubRepo } = req.body;
    if (!title || !description || !githubRepo) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const newProject = { title, description, githubRepo };
    projects.push(newProject);
    res.status(201).json(newProject);
});

// Endpoint to get all projects
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});