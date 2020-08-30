const register = require('./register')
const login = require('./login')
const {check} = require('express-validator')
const auth = require('../../middleware/auth')
const getUser = require('./get');


module.exports = (app) => {
    app.post('/users/register',
        [
            check('email', 'Please include a valid email').isEmail(),
            check('password', 'Password is required').isLength({min: 5}).exists(),
        ], register)

    app.post('/users/login', login)
    app.get('/users', auth, getUser)
}




