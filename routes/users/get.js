const User = require('../../models/User')

module.exports =  (req, res) => {
        User.find({}, (err, docs) =>{
            if (err) return console.log(err)
            
            const data = docs.find(doc => {
                console.log(doc._id = req.user.user.id)
                return doc._id = req.user.user.id
            })
            data.password = undefined;
            res.status(200).json({user: data})
        })
}
