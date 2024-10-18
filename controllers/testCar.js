const TestCar = require('../models/testCar')

const test = (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Test for testCar'
    })
}

const register = async (req, res) => {

    const params = req.body
    const id = req.params.id

    if (!params.answers) {
        return res.status(404).json({
            status: 'error',
            message: 'Faltan parametros'
        })
    }

    try {

        params.user = id
        const answersToSave = new TestCar(params)
        const answersToStorage = await answersToSave.save()

        return res.status(200).json({
            status: 'success',
            message: 'Has terminado el test de manera satisfactoria',
            answers: answersToStorage
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

const getTest = async (req, res) => {

    const userId = req.params.id

    try {

        const test = await TestCar.findOne({
            user: userId
        }) 

        if (!test) {
            return res.status(404).json({
                status: 'error',
                message: 'El test no existe'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Listado de tests',
            test
        })

    } catch (error) {
        return res.status(400).json({
            status: 'success',
            message: error.message
        })
    }
}

module.exports = {
    test,
    register,
    getTest
}