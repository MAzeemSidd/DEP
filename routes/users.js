import express from "express";
import getFunction from "../functions/getFunction.js";
import addFunction from "../functions/addFunction.js";
import updateFunction from "../functions/updateFunction.js";
import deleteFunction from "../functions/deleteFunction.js";

const router = express.Router();

//Get list of Users
router.get('/', async (req, res) => {
    const query = req.query.id ? `SELECT * FROM users WHERE id=${req.query.id}` : 'SELECT * FROM users'
    try {
        const data = await getFunction(query)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Add a User
router.post('/', async (req, res) => {
    const query = 'INSERT INTO users (`username`, `email`, `password`) VALUES (?)';
    const values = [req.body.username, req.body.email, req.body.password]
    const successMsg = 'User added successfully..!!'
    
    try {
        const data = await addFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Update a User
router.put('/', async (req, res) => {
    //Check for an empty request object
    if(Object.keys(req.body).length == 0) return res.send('There is not a single field in the request body')

    //Check if there is no id in query params
    if(!req.query.id) return res.send('"id" is not specified in query params')
    
    //else
    const query = 'UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE id = ?';
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
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
router.delete('/', async (req, res) => {
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

export default router;