const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    documentType: {
        type: String,
        required: true
    },

    document: {
        type: String,
        required: true
    },

    expedition: {
        type: String,
        required: true
    },

    testPlace: {
        type: String,
        required: true
    },

    companyName: {
        type: String,
        required: true
    },

    centerFormation: {
        type: String,
        required: true
    },

    testType: {
        type: String,
        required: true
    },

    grade: {
        type: String,
        default: '0'
    },

    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('User', UserSchema, 'users')