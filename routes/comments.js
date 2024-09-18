import express from "express";
import getFunction from "../functions/getFunction.js";
import addFunction from "../functions/addFunction.js";
import updateFunction from "../functions/updateFunction.js";
import deleteFunction from "../functions/deleteFunction.js";

const router = express.Router();

//Get list of Comments
router.get('/', (req, res) => {
    const query = req.query.id ? `SELECT * FROM comments WHERE comment_id=${req.query.id}` : 'SELECT * FROM comments'
    getFunction(res, query)
})

//Add a Comment
router.post('/', (req, res) => {
    const query = 'INSERT INTO comments (`post_id`, `user_id`, `content`) VALUES (?)';
    const values = [req.body.post_id, req.body.user_id, req.body.content]
    const successMsg = 'Comment added successfully..!!'
    addFunction(res, query, values, successMsg)
})

//Update a Comment
router.put('/', (req, res) => {
    //Check for an empty request object
    if(Object.keys(req.body).length == 0) return res.send('There is not a single field in the request body')

    //Check if there is no id in query params
    if(!req.query.id) return res.send('"id" is not specified in query params')
    
    //else
    const query = 'UPDATE comments SET `post_id` = ?, `user_id` = ?, `content` = ? WHERE comment_id = ?';
    const values = [
        req.body.post_id,
        req.body.user_id,
        req.body.content,
        req.query.id
    ]
    const successMsg = 'Comment updated successfully..!!'
    updateFunction(res, query, values, successMsg)
})

//Delete a Comment
router.delete('/', (req, res) => {
    //Checking if id is not null
    if(!req.query.id) return res.send('"id" is not specified in query params');
    //else
    const query = `DELETE FROM comments WHERE comment_id=${req.query.id}`
    const successMsg = 'Comment deleted successfully..!!'
    deleteFunction(res, query, successMsg)
})

export default router;