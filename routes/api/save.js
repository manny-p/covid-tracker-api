const User = require("../../models/User")

// @route    POST /api/set
// @desc     Save a country
// @access   Private

module.exports = async (req, res) => {
console.log(req.body.countries)
    try {
        // Get a copy of the user database object
        const results = await User.findById(req.user.user.id)

        // constructing a Set of countries
        const countrySet = new Set(results.countries)


        const parsedCountries = req.body.countries
        // console.log('fuckkkkkkyioudskdhcbshjhb' + req.body.countries)
        // debug complete

        // for every country in the body, add to list
        parsedCountries.forEach(country => countrySet.add(country))

        // merge the countries the user wants to follow
        results.countries = Array.from(countrySet)

        console.log(`results ${results.countries}`)

        // Save the updated object into the database / save country results
        await results.save()

        // remove the pw from user object
        results.password = undefined

        // return the object to the client via JSON response.
        res.status(200).json({msg: results})

    } catch (err) {
        res.status(500).json({msg: `Server Error ${err.message}`})
    }
}


