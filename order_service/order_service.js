import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const app = express()
const PORT = process.env.ORDER_PORT

app.use(express.json())
app.use(cors())



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})