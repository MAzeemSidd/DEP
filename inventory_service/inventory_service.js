import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getFunction from './functions/getFunction.js';
import addFunction from './functions/addFunction.js';
import updateFunction from './functions/updateFunction.js';
import deleteFunction from './functions/deleteFunction.js';
import axios from 'axios';

dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

/* Routes */

//Get Products' Inventory
app.get('/', async (req, res) => {
    const query = req.query.id ? `SELECT * FROM inventory WHERE status='Active' AND id=${req.query.id}` : "SELECT * FROM inventory WHERE status='Active'"
    try {
        const data = await getFunction(query)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Add a Product's Inventory
app.post('/', async (req, res) => {
    try{
        const response = await axios.get(`http://localhost:3530?id=${req.body.product_id}`)

        if(response?.data?.length > 0) {
            const query = 'INSERT INTO inventory (`product_id`, `quantity`, `status`) VALUES (?)';
            const values = [
                req.body.product_id,
                req.body.quantity,
                req.body.status
            ]
            const successMsg = 'User added successfully..!!'
            
            const data = await addFunction(query, values, successMsg)
            res.json(data)
        }
        else res.send(`There is no product of id ${req.body.product_id}`)
    }
    catch (err) {
        console.log(err)
    }
})

//Update a Product's Inventory
app.patch('/', async (req, res) => {
    //Check for an empty request object
    if(Object.keys(req.body).length == 0) return res.send('There is not a single field in the request body')

    //Check if there is no id in query params
    const id = req.query.id;
    if(!id) return res.send('"id" is not specified in query params')
    
    //else
    try{
        const response = await axios.get(`http://localhost:3530?id=${req.body.product_id}`)

        if(response?.data?.length > 0) {
            const query = 'UPDATE inventory SET `product_id` = ?, `quantity` = ?, `status` = ? WHERE id = ?';
            const values = [
                req.body.product_id,
                req.body.quantity,
                req.body.status,
                id
            ]
            const successMsg = 'User added successfully..!!'
            
            const data = await updateFunction(query, values, successMsg)
            res.json(data)
        }
        else res.send(`There is no product of id ${req.body.product_id}.`)
    }
    catch (err) {
        console.log(err)
    }
})

//Delete a Product
app.patch('/delete', async (req, res) => {
    const id = req.query.id
    
    //Checking if id is not null
    if(!id) return res.send('"id" is not specified in query params');

    //else
    const query = `UPDATE inventory SET status = 'Deleted' WHERE id=${id}`
    const successMsg = 'User deleted successfully..!!'
    
    try {
        const data = await deleteFunction(query, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

app.listen(PORT, () => {
    console.log(`Inventory service is running on port ${PORT}`)
})