const User = require("../../models/User")

// @route    POST /api/set
// @desc     Save a country
// @access   Private

module.exports = async (req, res) => {
    console.log(req.body.countries)
    try {
        // Get a copy of the user database object
        const user = await User.findById(req.user.user.id)

        // constructing a Set of countries
        const countrySet = new Set(user.countries)


        const parsedCountries = req.body.countries
        console.log(parsedCountries);

        // console.log('fuckkkkkkyioudskdhcbshjhb' + req.body.countries)
        // debug complete

        // for every country in the body, add to list
        parsedCountries.forEach(country => countrySet.add(country))

        // merge the countries the user wants to follow
        user.countries = Array.from(countrySet)

        console.log(`THIS BITCH IS USER.Countries!!!!!!!! ${user.countries}`)

        // Save the updated object into the database / save country results
        await user.save()

        // remove the pw from user object
        user.password = undefined
    

        // return the object to the client via JSON response.
        console.log(user)

        res.status(200).json({_id: user._id, countries: user.countries})

    } catch (err) {
        console.log(err)
        res.status(500).json({msg: `Server Error ${err.message}`})
    }
}


