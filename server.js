const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Sample catalog data
const catalogItems = [
  { id: 1, name: 'Item 1', description: 'Description for item 1', image: '/path/to/image1.jpg' },
  { id: 2, name: 'Item 2', description: 'Description for item 2', image: '/path/to/image2.jpg' },
  // Add more items here
];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
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
