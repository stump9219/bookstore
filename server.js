// Import the express module
const express = require('express');
const path = require('path');

// Create an instance of an express application
const app = express();

// Define the port number
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Route for the catalog page
app.get('/catalog', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'catalog.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
