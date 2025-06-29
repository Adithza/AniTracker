import express from 'express'
import cors from 'cors'
import AuthRoutes from './Routes/AuthRoutes.js'
const app = express()
const port = 3000


app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/auth', AuthRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
