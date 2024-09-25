import express from "express";
import getFunction from "../functions/getFunction.js";
import addFunction from "../functions/addFunction.js";
import updateFunction from "../functions/updateFunction.js";
import deleteFunction from "../functions/deleteFunction.js";

const router = express.Router();

//Get list of Posts
router.get('/', async (req, res) => {
    const query = req.query.id ? `SELECT * FROM posts WHERE id=${req.query.id}` : 'SELECT * FROM posts'
    
    try {
        const data = await getFunction(query)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Add a Post
router.post('/', async (req, res) => {
    const query = 'INSERT INTO posts (`user_id`, `title`, `content`) VALUES (?)';
    const values = [req.body.user_id, req.body.title, req.body.content]
    const successMsg = 'Post added successfully..!!'
    
    try {
        const data = await addFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Update a Post
router.put('/', async (req, res) => {
    //Check for an empty request object
    if(Object.keys(req.body).length == 0) return res.send('There is not a single field in the request body')

    //Check if there is no id in query params
    if(!req.query.id) return res.send('"id" is not specified in query params')
    
    //else
    const query = 'UPDATE posts SET `user_id` = ?, `title` = ?, `content` = ? WHERE id = ?';
    const values = [
        req.body.user_id,
        req.body.title,
        req.body.content,
        req.query.id
    ]
    const successMsg = 'Post updated successfully..!!'
    
    try {
        const data = await updateFunction(query, values, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

//Delete a Post
router.delete('/', async (req, res) => {
    //Checking if id is not null
    if(!req.query.id) return res.send('"id" is not specified in query params');
    //else
    const query = `DELETE FROM posts WHERE id=${req.query.id}`
    const successMsg = 'Post deleted successfully..!!'
    
    try {
        const data = await deleteFunction(query, successMsg)
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})

export default router;