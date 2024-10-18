const jwt = require('jwt-simple')
const { secretKey } = require('../services/jwt')
const moment = require('moment')

exports.auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            status: 'error',
            message: 'Falta la autorizacion de la cabecera'
        })
    }

    const token = req.headers.authorization.replace(/["']+/g, '')

    try {

        const payload = jwt.decode(token, secretKey)

        if (payload.exp <= moment().unix() ) {
            return res.status(401).json({
                status: 'error',
                message: 'El token ya ha expirado'
            })
        }

        req.user = payload

    } catch (error) {
        return res.status(403).json({
            status: 'error',
            message: error.message
        })
    }

    next()
}