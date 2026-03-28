const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required"],
        unique: [true, "token already exists"]
    }
}, {
    timestamps: true
})

const blacklistTokenModel = mongoose.model("blacklistToken", blacklistTokenSchema)

module.exports = blacklistTokenModel