const mongoose = require('mongoose')
const { config } = require('dotenv')

config()

mongoose.set('strictQuery','false')

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Te has conectado de manera satisfactoria a la BD')
    } catch ( error ) {
        console.log('No se pudo conectar a la base de datos', error.message)
    }
}

module.exports = connect