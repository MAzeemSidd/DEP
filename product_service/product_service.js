import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getFunction from './functions/getFunction.js';
import addFunction from './functions/addFunction.js';
import updateFunction from './functions/updateFunction.js';
import deleteFunction from './functions/deleteFunction.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

/* Routes */

//Get Products
app.get('/', async (req, res) => {
    let query;
    if(req.query.custom) query = req.query.custom
    else if(req.query.id) query = `SELECT * FROM products WHERE status='Active' id=${req.query.id}`
    else query = "SELECT * FROM products WHERE status='Active'"

    try {
        const data = await getFunction(query)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Add a Product
app.post('/', async (req, res) => {
    const query = 'INSERT INTO products (`name`, `description`, `price`, `category`, `status`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        req.body.status
    ]
    const successMsg = 'User added successfully..!!'
    
    try {
        const data = await addFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Update a Product
app.patch('/', async (req, res) => {
    //Check for an empty request object
    if(Object.keys(req.body).length == 0) return res.send('There is not a single field in the request body')

    //Check if there is no id in query params
    const id = req.query.id;
    if(!id) return res.send('"id" is not specified in query params')
    
    //else
    const query = 'UPDATE products SET `name` = ?, `description` = ?, `price` = ?, `category` = ?, `status` = ? WHERE id = ?';
    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        req.body.status
    ]
    const successMsg = 'User updated successfully..!!'

    try {
        const data = await updateFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Delete a Product
app.patch('/delete', async (req, res) => {
    const id = req.query.id
    
    //Checking if id is not null
    if(!id) return res.send('"id" is not specified in query params');

    //else
    const query = `UPDATE products SET status = 'Deleted' WHERE id=${id}`
    const successMsg = 'User deleted successfully..!!'
    
    try {
        const data = await deleteFunction(query, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})