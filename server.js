const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

const ownerEmail = 'owner@gmail.com';

// Sample catalog data with stock levels
const catalogItems = [
  { id: 1, name: 'Eragon', description: 'A boy gets a dragon and goes on an adventure.', stock: 10 },
  { id: 2, name: 'Eldest', description: 'That boy and his dragon grow up and continue on their adventure.', stock: 5 },
  { id: 3, name: 'Inheritance', description: 'The adventure continues, just with more people and dragons.', stock: 2 },
  { id: 4, name: 'Murtagh', description: 'The brother of the original character also found a dragon and began his adventures.', stock: 1 },
  { id: 5, name: 'A Tail of Two Cities', description: "I've never read this book so I don't know.", stock: 7 },
  { id: 6, name: 'The Little Prince', description: "I think this is a French book.",},
  { id: 7, name: 'The Alchemist', description: "Brotherhood was better than full metal.",},
  { id: 8, name: 'HP and the Philosophers Stone', description: "Didn't know this book sold over 100 million copies.",},
  { id: 9, name: 'Dream of the Red Chamber', description: 'This is apparently a mystery book that sold really well.',},
  { id: 10, name: 'The Hobbit.', description: 'The best book on this website to be honest',},
  { id: 11, name: "Alice's Adventure in the Wonderland", description: 'alice had depression and this was all in her head to try and cope with reality.',},
  { id: 12, name: "The Lion, The Witch, and The Wardrobe", description: "This one was also about depression and how kids dealt with the reality of one of the world wars."},
  { id: 13, name: "She: A History of Adventure", description: "Ya no clue on this one what so ever."},
  { id: 14, name: "The Da Vinci Code", description: "Tom Hanks that is all."},
  { id: 15, name: "HP and the Chamber of Secrets", description: "another harry potter book, suprising"},
  { id: 16, name: "The Catcher and the Rye", description: "some thing about rye and how to catch it"},
  { id: 17, name: "HP and the Prisoner of Azkaban", description: "more potter books apparently the whole series sold really well"},
  { id: 18, name: "The Bridges of Maddison County", description: "Maddison county and enough bridges to write a book about it."},
  { id: 19, name: "One Hundred Years of Solitude", description: "didn't know there was a book written about the city in skyrim."},
  { id: 20, name: "Lolita", description: "Ya I got nothing for this one."},
  { id: 21, name: "Heidi", description: "This is a girls name and thats all I know."},
  { id: 22, name: "Anne of Green Gabble", description: "Something about gabbles and them being green"},

  // Add more items with stock here
];

// Low stock threshold
const LOW_STOCK_THRESHOLD = 3;

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send low stock alerts via email
const sendLowStockAlert = (item) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: ownerEmail,
    subject: `Low Stock Alert: ${item.name}`,
    text: `The stock for ${item.name} is low. Only ${item.stock} units left. Please restock soon.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Low stock email sent: ' + info.response);
    }
  });
};

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

// Route to simulate a sale and reduce stock
app.post('/sell/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = catalogItems.find(p => p.id === itemId);

  if (item && item.stock > 0) {
    item.stock -= 1;
    res.send(`Sold 1 unit of ${item.name}. Remaining stock: ${item.stock}`);

    // Check if stock falls below the threshold and send an alert
    if (item.stock <= LOW_STOCK_THRESHOLD) {
      sendLowStockAlert(item);
    }
  } else {
    res.status(404).send('Product not found or out of stock');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

