import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getFunction from '../functions/getFunction.js';
import addFunction from '../functions/addFunction.js';
import updateFunction from '../functions/updateFunction.js';
import deleteFunction from '../functions/deleteFunction.js';

dotenv.config();

const app = express()
const PORT = process.env.USER_PORT

app.use(express.json())
app.use(cors())

//Add a User
app.get('/', async (req, res) => {
    const query = req.query.id ? `SELECT * FROM users WHERE id=${req.query.id}` : 'SELECT * FROM users'
    try {
        const data = await getFunction(query)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Add a User
app.post('/', async (req, res) => {
    const query = 'INSERT INTO users (`username`, `email`, `password_hash`, `first_name`, `last_name`, `status`) VALUES (?)';
    const values = [req.body.username, req.body.email, req.body.password_hash, req.body.first_name, req.body.last_name, req.body.status]
    const successMsg = 'User added successfully..!!'
    
    try {
        const data = await addFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Update a User
app.put('/', async (req, res) => {
    //Check for an empty request object
    if(Object.keys(req.body).length == 0) return res.send('There is not a single field in the request body')

    //Check if there is no id in query params
    if(!req.query.id) return res.send('"id" is not specified in query params')
    
    //else
    const query = 'UPDATE users SET `username` = ?, `email` = ?, `password_hash` = ?, `first_name` = ?, `last_name` = ?,`status` = ?, WHERE id = ?';
    const values = [
        req.body.username,
        req.body.email,
        req.body.password_hash,
        req.body.first_name,
        req.body.last_name,
        req.body.status,
        req.query.id
    ]
    const successMsg = 'User updated successfully..!!'

    try {
        const data = await updateFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Delete a User
app.delete('/', async (req, res) => {
    //Checking if id is not null
    if(!req.query.id) return res.send('"id" is not specified in query params');
    //else
    const query = `DELETE FROM users WHERE id=${req.query.id}`
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