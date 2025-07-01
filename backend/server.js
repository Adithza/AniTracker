import express from 'express'
import cors from 'cors'
import AuthRoutes from './Routes/AuthRoutes.js'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express()
const port = process.env.PORT;


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/auth', AuthRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})
