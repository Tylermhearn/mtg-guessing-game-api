const express = require('express')
const router = express.Router()

// const sql = knex.select().from('users').where('name', 'tyler').toString()
// console.log(sql);

// router.get('/login', (req, res) => {

//   knex.raw(sql).then(resp =>
//     res.status(200).send({
//       body: resp.rows
//     }))
//   res.status(200).send({
//     body: 'Login'
//   })
// })


module.exports = router