const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Sample catalog data
const catalogItems = [
  { id: 1, name: 'Eragon', description: 'A boy gets a dragon and goes on an adventure.'},
  { id: 2, name: 'Eldest', description: 'That boy and his dragon grow up and continue on their adventure.',},
  { id: 3, name: 'Inheritance', description: 'The adventure continues, just with more people and dragons.',},
  { id: 4, name: 'Murtagh', description: 'The brother of the original character also found a dragon and began his adventures.',},
  { id: 5, name: 'A Tail of Two Cities', description: "I've never read this book so I don't know.",},
  { id: 6, name: 'The Little Prince', description: "I think this is a French book.",},
  { id: 7, name: 'The Alchemist', description: "Brotherhood was better than full metal.",},
  { id: 8, name: 'HP and the Philosophers Stone', description: "Didn't know this book sold over 100 million copies.",},
  { id: 9, name: 'Dream of the Red Chamber', description: 'This is apparently a mystery book that sold really well.',},
  { id: 10, name: 'The Hobbit.', description: 'The best book on this website to be honest',},
  { id: 11, name: "Alice's Adventure in the Wonderland", description: 'alice had depression and this was all in her head to try and cope with reality.',},  
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
