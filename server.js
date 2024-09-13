const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Sample catalog data
const catalogItems = [
  { id: 1, name: 'Eragon', description: 'A boy gets a dragon and goes on an adventure.', image: '//bookstore/public/Eragon.jpg' },
  { id: 2, name: 'Eldest', description: 'That boy and his dragon grow up and continue on their adventure.', image: '/bookstore/public/Eldest.jpg' },
  // Add more items here
];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'catalog.html'));
});

// Route for the catalog page with pagination
app.get('/catalog', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 5; // Number of items per page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const paginatedItems = catalogItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(catalogItems.length / itemsPerPage);

  res.json({ items: paginatedItems, totalPages });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
