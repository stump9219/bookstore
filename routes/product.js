const express = require('express');
const nodemailer = require('nodemailer');
const Product = require('../models/Product');
const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword',
  },
});

// Check stock levels and send alerts if low
router.get('/check-stock', async (req, res) => {
  const products = await Product.find({ stock: { $lt: 'minStockLevel' } });

  products.forEach(async (product) => {
    const mailOptions = {
      from: 'youremail@gmail.com',
      to: 'owner@example.com',
      subject: `Low stock alert for ${product.name}`,
      text: `The product ${product.name} is low on stock. Only ${product.stock} left.`,
    };

    await transporter.sendMail(mailOptions);
  });

  res.status(200).json({ message: 'Stock checked and alerts sent if necessary' });
});

module.exports = router;
router.post('/sale', async (req, res) => {
    const { productId, quantity } = req.body;
  
    // Find product and update stock
    const product = await Product.findById(productId);
    product.stock -= quantity;
  
    if (product.stock < 0) return res.status(400).json({ message: 'Insufficient stock' });
  
    await product.save();
  
    // Send sale alert email
    const mailOptions = {
      from: 'youremail@gmail.com',
      to: 'owner@example.com',
      subject: `Sale made for ${product.name}`,
      text: `A sale has been made! ${quantity} units of ${product.name} were sold.`,
    };
  
    await transporter.sendMail(mailOptions);
  
    res.status(200).json({ message: 'Sale processed and owner alerted' });
  });
  