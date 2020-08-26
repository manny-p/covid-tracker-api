const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
require('./src/db');

// a new instance of express
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({extended: true}))

// middleware
app.use(bodyParser.urlencoded({extended: true}))

// custom routes
require('./routes/api/')(app)
require('./routes/users/')(app)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on: ${process.env.PORT}`)
})
