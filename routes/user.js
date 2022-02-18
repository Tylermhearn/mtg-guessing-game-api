const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// const sql = knex.select().from('users').where('name', 'tyler').toString()

router.post('/create', userController.createUser)

module.exports = router