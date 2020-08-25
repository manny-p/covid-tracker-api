const User = require('../../models/User')

module.exports = async (req, res) => {
    try {
// step 1 get a copy of user data
        const user = await User.findById(req.params.id)
// step 2a remove the pw from user object
        delete user.password
// step 2b send the user id and country preferences in the response
        res.status(200).json({user})
    } catch (err) {
        res.status(404).json({msg: err.message})
    }
}

