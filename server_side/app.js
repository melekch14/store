require('dotenv').config();
require('./config/database');
const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categories', categoryRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
