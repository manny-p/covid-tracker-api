const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const api = require('./routes/api/api');
require('dotenv').config();
require('./src/db');
const auth = require('./middleware/auth');

// new instance
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({extended: true}));

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// custom routes
app.use('/api', auth, api)
require('./routes/users/')(app)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on: ${process.env.PORT}`)
})
