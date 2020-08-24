const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    countries: [String]
})

// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });

    UserSchema.pre('save', function (next) {
        const SALT_WORK_FACTOR = 10;

        let user = this;

        // hash password if modified/new
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // hash pw using our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                // override cleartext pw with hashed
                user.password = hash;
                next();
            });
        });
    });

// UserSchema.methods.generateHash = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// checking if password is valid
    UserSchema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    let User = mongoose.model('User', UserSchema);

    module.exports = User;




