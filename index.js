import express, { json } from 'express'

const app = express()
const port = 8080;

app.use(json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/hello', (req, res) => {
  res.status(200).send({
    body: 'Test'
  })
})
