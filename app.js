import express from 'express';
import cors from 'cors';
import users from './routes/users.js'
import posts from './routes/posts.js'
import comments from './routes/comments.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const PORT = 4545

app.use(express.json())
app.use(cors())

/* Routes */
app.use('/users', users) //users
app.use('/posts', posts) //posts
app.use('/comments', comments) //comments


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
