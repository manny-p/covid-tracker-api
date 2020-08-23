const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const api = require("./routes/api");
require("dotenv").config();
const db = require("./src/db");
const register = require('./routes/register')


// new instance
const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ extended: true }));


// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// routes
app.get('/', (_,res) => {
    res.status(200).json({
        message: "You made it"
    })
})

// custom routes
app.use('/api', api)
app.use('/user', register)

app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on: ${process.env.PORT}`)
})
