const countries = require('./countries')
const set = require('./set')
const auth = require('../../middleware/auth')

module.exports = (app) => {
    // app.post('/api/countries/:id', auth, countries)
    app.post('/api/countries/', auth, countries)
    app.post('/api/set/', auth, set)
}
