const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true },
    password: { type: String }
}, {
    collection: 'usuarios'
}
);

// Password hashing logic only for non-OAuth users
UserSchema.pre('save', function (next) {
    var user = this;

    // If password is empty (OAuth user), skip hashing
    if (!user.password || !user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false // No password for OAuth users

    let resp = undefined
    await bcrypt.compare(candidatePassword, this.password).then((result) => {
        resp = result
    }).catch((err) => {
        resp = false
    })

    return resp
};

module.exports = mongoose.model('Users', UserSchema);