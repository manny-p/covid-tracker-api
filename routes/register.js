const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.post('/register',(req,res) => {
    const username = req.body.username
    const password = req.body.password

    const user = new User({username, password})
    user.save( err => {
        if (err) res.status(500).json({error: err.message});
        console.log("We made it!!!", user);
        res.end();
    })
})

module.exports = router

