const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const uuid = require('uuid')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    hashedPassword: {
        type: String,
        required: [true, "Password is required"]
    },
    fav: {
        type: Array,
        default: []
    },
    avatar: {
        type: String,
        default: ""
    },
    salt: String,
})

userSchema.methods = {
    authenticate: function (hashPassword) {
        return bcrypt.compare(hashPassword, this.password)
    }
}

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuid.v1();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

module.exports = mongoose.model("User", userSchema);
