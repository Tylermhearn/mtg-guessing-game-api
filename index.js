const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const apiErrorHandler = require('./error/apiErrorHandler')

dotenv.config();
process.env.TOKEN_SECRET;

const app = express()
app.use(cors())
const port = 8080;

app.use(express.json())

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})