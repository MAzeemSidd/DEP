import express from "express";
import getFunction from "../functions/getFunction.js";
import addFunction from "../functions/addFunction.js";
import updateFunction from "../functions/updateFunction.js";
import deleteFunction from "../functions/deleteFunction.js";

const router = express.Router();

//Get list of Users
router.get('/', (req, res) => {
    const query = req.query.id ? `SELECT * FROM users WHERE id=${req.query.id}` : 'SELECT * FROM users'
    getFunction(res, query)
})

//Add a User
router.post('/', (req, res) => {
    const query = 'INSERT INTO users (`username`, `email`, `password`) VALUES (?)';
    const values = [req.body.username, req.body.email, req.body.password]
    const successMsg = 'User added successfully..!!'
    addFunction(res, query, values, successMsg)
})

//Update a User
router.put('/', (req, res) => {
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
    updateFunction(res, query, values, successMsg)
})

//Delete a User
router.delete('/', (req, res) => {
    //Checking if id is not null
    if(!req.query.id) return res.send('"id" is not specified in query params');
    //else
    const query = `DELETE FROM users WHERE id=${req.query.id}`
    const successMsg = 'User deleted successfully..!!'
    deleteFunction(res, query, successMsg)
})

export default router;