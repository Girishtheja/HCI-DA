const mongoose = require('mongoose')
const Schema = mongoose.Schema
const answerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
    },
    code:{
        type:String,
        // required:true,
    },
    codeLanguage:
    {
        type:String,
        // required:true
    },
    upvotes: [{
        upvote: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        }
    }],
    downvotes: [{
        downvote: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        }
    }],
})
module.exports = mongoose.model('Answers', answerSchema)