// const User = require('../../models/User')


// @route    POST /api/countries
// @desc     User's tracked countries
// @access   Private

module.exports = async (req, res) => {

    try {
        console.log(req.body.countries)
// step 1 get a copy of user data

//         const user = await User.findById(req.params.id)
        const user = await req.user
// step 2a remove the pw from user object
        delete user.password
// step 2b send the user id and country preferences in the response
        res.status(200).json({user})
    } catch (err) {
        res.status(404).json({msg: err.message})
    }
}




