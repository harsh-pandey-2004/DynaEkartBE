const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    OTP: {
        type: String,
        required: true,
    },
    // expireAt: {
    //     type: Date,
    //     default: Date.now,
    //     index: { expires: '5m' },
    // },
})

module.exports = mongoose.model('otp', otpSchema);