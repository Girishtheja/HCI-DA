const mongoose = require('mongoose')
const Schema = mongoose.Schema
const requestSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    nftType: {
        type: Number,
        required: true,
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false,
    }
})

module.exports = mongoose.model('Request', requestSchema)