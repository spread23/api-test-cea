const { Schema, model } = require('mongoose')

const TestMotoSchema = Schema({
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


module.exports = model('Testmoto', TestMotoSchema, 'testmotos')