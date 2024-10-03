import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import addFunction from './functions/addFunction.js';
import mysql from 'mysql2';
import { db } from './functions/dbConnection.js';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

//Add a Order
app.post('/', async (req, res) => {
    try{
        const ids = req.body.items.map(product => product.product_id).join(', ')
        const product_query = `SELECT id, price FROM products WHERE id IN (${ids})`
        
        const product_res = await axios.get('http://localhost:3530?custom=' + product_query)
        // product_res?.data?.map(item => ({product}));
        const combinedItems = req.body?.items?.map(item => {
            const product = product_res?.data?.find(p => p.id === item.product_id);
            return {
                id: item.product_id,
                quantity: item.quantity,
                price: product.price,
            };
        });

        const total_amount = combinedItems.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);

        console.log(total_amount)

        const query = 'INSERT INTO orders (`user_id`, `total_amount`) VALUES (?, ?)';
        const values = [
            req.body.user_id,
            total_amount
        ]
        const successMsg = 'User added successfully..!!'
        
        // const data = await addFunction(query, values, successMsg)

        const result = await connection.execute(query, values);
        console.log(result.insertId)
        res.json(result.insertId)

    }
    catch (err) {
        console.log(err)
    }
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})