const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Temporary server-side storage
let submissions = [];

// Serve static files
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    // Store validated data
    submissions.push({ name, email, message });

    // Render response.ejs with submitted data
    res.render('response', { name, email, message });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
