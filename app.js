require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const ateneiRoutes = require('./routes/ateneiRoutes');
const tipologieRoutes = require('./routes/tipologieRoutes');
const corsiRoutes = require('./routes/corsiRoutes');
const homepageRoutes = require('./routes/homepageRoutes');


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/atenei', ateneiRoutes);
app.use('/tipologie', tipologieRoutes);
app.use('/corsi', corsiRoutes);
app.use('/', homepageRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

