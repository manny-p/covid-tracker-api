const mongoose = require('mongoose');


// start the db
dbURI = process.env.HOST
console.log(`mongoose connected: ${dbURI}`)

dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}
mongoose.connect(dbURI, dbOptions)

const db = mongoose.connection

db.on('error', (err) => {
    console.error(err);
    process.exit(1);
})

module.exports = db;
