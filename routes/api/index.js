const countries = require('./countries')
const auth = require('../../middleware/auth')

module.exports = (app) => {
    app.post('/api/countries/:id', auth, countries)
}
