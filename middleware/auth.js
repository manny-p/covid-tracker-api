const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log(req.body.countries)
    const authHeader = req.headers['authorization']
    console.log(`authHeader ${authHeader}`)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    // console.log(token)
    jwt.verify(token, process.env.SECRET, (err, user) => {
        // console.log(err)
        if (err) return res.sendStatus(403)
        // req.user.id = user
        req.user = user
        console.log(req.body.countries)
        next() // pass the execution off to whatever request the client intended
    })
}



