const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    codeLanguage: {
        type: String
    },
    image: {
        type: String
    }

})
module.exports = mongoose.model('Question', questionSchema)