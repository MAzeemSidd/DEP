import express from "express";
import getFunction from "../functions/getFunction.js";
import addFunction from "../functions/addFunction.js";
import updateFunction from "../functions/updateFunction.js";
import deleteFunction from "../functions/deleteFunction.js";

const router = express.Router();

//Get list of Posts
router.get('/', (req, res) => {
    const query = req.query.id ? `SELECT * FROM posts WHERE id=${req.query.id}` : 'SELECT * FROM posts'
    getFunction(res, query)
})

//Add a Post
router.post('/', (req, res) => {
    const query = 'INSERT INTO posts (`user_id`, `title`, `content`) VALUES (?)';
    const values = [req.body.user_id, req.body.title, req.body.content]
    const successMsg = 'Post added successfully..!!'
    addFunction(res, query, values, successMsg)
})

//Update a Post
router.put('/', (req, res) => {
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
    updateFunction(res, query, values, successMsg)
})

//Delete a Post
router.delete('/', (req, res) => {
    //Checking if id is not null
    if(!req.query.id) return res.send('"id" is not specified in query params');
    //else
    const query = `DELETE FROM posts WHERE id=${req.query.id}`
    const successMsg = 'Post deleted successfully..!!'
    deleteFunction(res, query, successMsg)
})

export default router;