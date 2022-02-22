const express = require('express');
const cors = require('cors')
const apiErrorHandler = require('./error/apiErrorHandler')
const authenticateToken = require('./middleware/authenticateToken')

process.env.TOKEN_SECRET;

const app = express()
app.use(cors())
const port = 8080;

app.use(express.json())

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

app.use(authenticateToken);

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})