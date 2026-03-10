const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

// Load environment variables from backend/.env
require('dotenv').config({ path: path.join(__dirname, '.env') });

const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json()); // req body
const PORT = process.env.PORT || 5000;

// import the router files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// use the routes
app.use('/user', userRoutes);
app.use('/candidates', candidateRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});