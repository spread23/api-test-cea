const jwt = require('jwt-simple')
const { config } = require('dotenv')
const moment = require('moment')

config()

const secretKey = process.env.SECRET_KEY

const createToken = (user) => {
    const payload = {
        id: user._id,
        name:  user.name,
        lastname: user.lastname,
        email: user.email,
        document: user.document,
        companyName: user.companyName,
        iat: moment().unix(),
        exp: moment().add(30, 'days')
    }

    return jwt.encode(payload, secretKey)
}

module.exports = {
    createToken,
    secretKey
}