const User = require('../models/user')
const TestMoto = require('../models/testMoto')
const TestCar = require('../models/testCar')

const bcrypt = require('bcrypt')
const { createToken } = require('../services/jwt')

const userTest = (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Endpoint de prueba de user'
    })
}

const register = async (req, res) => {
    const params = req.body

    if (!params.name || !params.lastname || !params.email || !params.password || !params.testType) {
        return res.status(404).json({
            status: 'error',
            message: 'Faltan parametros'
        })
    }

    try {

        const users = await User.find({
            email: params.email
        })

        if (users && users.length >= 1) {
            return res.status(400).json({
                status: 'error',
                message: 'El usuario ya existe, registrate con otro email'
            })
        }

        const pwd = await bcrypt.hash(params.password, 10)
        params.password = pwd

        const userToSave = new User(params)
        const userToStorage = await userToSave.save()

        return res.status(200).json({
            status: 'success',
            message: 'Te has registrado de manera satisfactoria',
            user: userToStorage
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

const login = async (req, res) => {

    const params = req.body

    if (!params.email || !params.password) {
        return res.status(404).json({
            status: 'error',
            message: 'Faltan parametros'
        })
    }


    try {

        const user = await User.findOne({
            email: params.email
        })

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'El email no existe'
            })
        }

        const pwd = bcrypt.compareSync(params.password, user.password)

        if (!pwd) {
            return res.status(400).json({
                status: 'error',
                message: 'Las contraseñas no coinciden'
            })
        }

        const token = createToken(user)

        return res.status(200).json({
            status: 'succes',
            message: 'Has hecho login correctamente',
            user,
            token
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

const getUsers = async (req, res) => {

    try {

        const users = await User.find()

        if (!users || users.length <= 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Aun no hay usuarios'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Listado de usuarios',
            users
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {

    const id = req.params.id

    try {

        const userDeleted = await User.findOneAndDelete({
            _id: id
        }) 

        if (!userDeleted) {
            return res.status(404).json({
                status:'error',
                message: 'El usuario no existe'
            })
        }

        const testMotoDeleted = await TestMoto.findOneAndDelete({
            user: userDeleted.id
        })

        const testCarDeleted = await TestCar.findOneAndDelete({
            user: userDeleted.id
        })

        return res.status(200).json({
            status: 'success',
            message: 'Usuario eliminado satisfactoriamente',
            user: userDeleted,
            testMoto: testMotoDeleted,
            testCar: testCarDeleted
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

module.exports = {
    userTest,
    register,
    login,
    getUsers,
    deleteUser
}