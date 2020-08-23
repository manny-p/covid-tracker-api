const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {check, validationResult} = require('express-validator');

router.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        let user = await User.findOne({username});

        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }


        user = new User({username, password})
        await user.save()

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 480000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({token});
            },
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        let user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({msg: 'User not found, please register'});
        }

        // user = new User({username, password})
        // await user.save()

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 480000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({token});
            },
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router


