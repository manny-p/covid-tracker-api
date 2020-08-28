const auth = require('../../middleware/auth')
const countries = require('./countries')
const set = require('./set')
let remove = require('./remove')

module.exports = (app) => {
    // app.post('/api/countries/:id', auth, countries)
    app.post('/api/countries/', auth, countries)
    app.post('/api/set/', auth, set)
    app.post('/api/set/', auth, remove)
}
