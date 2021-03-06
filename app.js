const express = require('express');
require('dotenv').config();
require('./src/db');

const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');


// a new instance of express
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({extended: true}))

// middleware
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (_, res) => {
    res.status(200).json({msg: 'sanity check'})
})

// custom routes
require('./routes/api/')(app)
require('./routes/users/')(app)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on: ${process.env.PORT}`)
})
