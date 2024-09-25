import express from "express";
import getFunction from "../functions/getFunction.js";
import addFunction from "../functions/addFunction.js";
import updateFunction from "../functions/updateFunction.js";
import deleteFunction from "../functions/deleteFunction.js";

const router = express.Router();

//Get list of Comments
router.get('/', async (req, res) => {
    const query = req.query.id ? `SELECT * FROM comments WHERE id=${req.query.id}` : 'SELECT * FROM comments'
    
    try {
        const data = await getFunction(query)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Add a Comment
router.post('/', async (req, res) => {
    const query = 'INSERT INTO comments (`post_id`, `user_id`, `content`) VALUES (?)';
    const values = [req.body.post_id, req.body.user_id, req.body.content]
    const successMsg = 'Comment added successfully..!!'
    
    try {
        const data = await addFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Update a Comment
router.put('/', async (req, res) => {
    //Check for an empty request object
    if(Object.keys(req.body).length == 0) return res.send('There is not a single field in the request body')

    //Check if there is no id in query params
    if(!req.query.id) return res.send('"id" is not specified in query params')
    
    //else
    const query = 'UPDATE comments SET `post_id` = ?, `user_id` = ?, `content` = ? WHERE id = ?';
    const values = [
        req.body.post_id,
        req.body.user_id,
        req.body.content,
        req.query.id
    ]
    const successMsg = 'Comment updated successfully..!!'
    
    try {
        const data = await updateFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Delete a Comment
router.delete('/', async (req, res) => {
    //Checking if id is not null
    if(!req.query.id) return res.send('"id" is not specified in query params');
    //else
    const query = `DELETE FROM comments WHERE id=${req.query.id}`
    const successMsg = 'Comment deleted successfully..!!'
    
    try {
        const data = await deleteFunction(query, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

export default router;