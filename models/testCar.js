const { Schema, model } = require('mongoose')

const TestCarSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    answers: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = model('Testcar', TestCarSchema, 'testcars')