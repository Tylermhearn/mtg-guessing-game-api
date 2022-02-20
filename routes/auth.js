const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

// const sql = knex.select().from('users').where('name', 'tyler').toString()

router.post('/createUser', authController.createUser)

module.exports = router