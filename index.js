const express = require('express')
const cors = require('cors')
const { config } = require('dotenv')

const connect = require('./database/connection')

const UserRouter = require('./routes/user')
const TestMotoRouter = require('./routes/testMoto')
const TestCarRouter = require('./routes/testCar')

config()
connect()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Endpoint de prueba'
    })
})

app.use('/api/user', UserRouter)
app.use('/api/test-moto', TestMotoRouter)
app.use('/api/test-car', TestCarRouter)

app.listen(PORT, () => {
    console.log('El Server esta escuchando en el puerto ', PORT)
})