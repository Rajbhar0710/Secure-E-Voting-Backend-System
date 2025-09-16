const express = require('express')
const app = express();
const db = require('./db');
 require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req bosy 
const PORT = process.env.PORT || 3000;

// import the router files
const userRoutes = require('./routes/userRoutes');
const CandidateRoutes = require('./routes/candidateRoutes');
// use th routes
app.use('/user',userRoutes);


app.listen(PORT ,()=>{
      console.log('listening on port 3000');
})