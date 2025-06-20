const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Mock database for video jobs
const jobs = {};

// API Endpoints
app.post('/generate', async (req, res) => {
    const { type, prompt } = req.body;
    const jobId = `job_${Date.now()}`;
    
    // Store job in memory
    jobs[jobId] = {
        status: 'processing',
        type,
        prompt,
        createdAt: new Date()
    };
    
    // Simulate processing delay
    setTimeout(() => {
        jobs[jobId].status = 'completed';
        jobs[jobId].resultUrl = type === 'gif' 
            ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDZ0dXJjZ3RqY2VhZ2R6b2Z0Y2R4dWJ5eWJ6c3R4eGZ2dXJ6eWZ5ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aTskHEUdgCQAXde/giphy.gif'
            : 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';
    }, 5000);
    
    res.json({ jobId });
});

app.get('/status/:jobId', (req, res) => {
    const job = jobs[req.params.jobId];
    if (!job) return res.status(404).json({ error: 'Job not found' });
    
    res.json({
        status: job.status,
        url: job.resultUrl
    });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'core.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});