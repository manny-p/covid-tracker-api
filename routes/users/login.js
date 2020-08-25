const jwt = require('jsonwebtoken');
const User = require('../../models/User')

module.exports = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        let user = await User.findOne({email});
        const validationCheck = user.validPassword(password)

        if (!validationCheck) {
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
}


