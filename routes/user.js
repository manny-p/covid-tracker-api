const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {check, validationResult} = require('express-validator');


router.post('/register', [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').isLength({min: 5}).exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const email = req.body.email
        const password = req.body.password


        try {
            let user = await User.findOne({email});

            if (user) {
                return res.status(400).json({msg: 'User already exists'});
            }

            user = new User({email, password, countries: []})
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
    const email = req.body.email
    const password = req.body.password

    try {
        let user = await User.findOne({email});
        const validationCheck = user.validPassword(password)

        if(!validationCheck) {
            return res.status(401).json({msg: 'invalid password'})
        }

        if (!user) {
            return res.status(404).json({msg: 'User not found, please register'});
        }

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


