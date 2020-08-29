const auth = require('../../middleware/auth')
const countries = require('./countries')
const save = require('./save')
// let remove = require('./remove')

module.exports = (app) => {
    // app.post('/api/countries/:id', auth, countries)
    app.post('/api/countries/', auth, countries)
    app.post('/api/countries/save/', auth, save)
    // app.post('/api/remove/', auth, remove)
}
