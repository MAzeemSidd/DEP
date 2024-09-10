import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'dep'
})


/** Products Routes **/

//Get list of Products
app.get('/products', (req, res) => {
    const query = 'SELECT * from products'

    db.query(query, (err, data) => {
        if(err) return res.send(err);
        return res.json(data);
    })
})

//Add a Product
app.post('/products', (req, res) => {
    const query = 'INSERT INTO products (`name`, `brand`, `price`, `storage`, `camera`, `battery`) values (?)';
    const values = [req.body.name, req.body.brand, req.body.price, req.body.storage, req.body.camera, req.body.battery]

    db.query(query, [values], (err) => {
        if(err) return res.send(err);
        return res.send('Product added successfully..!!');
    })
})

//Update a Product
app.put('/products', (req, res) => {
    //Check for an empty request object
    if(Object.keys(req.body).length == 0) return res.send('There is not a single field in the request body')

    //Check if there is no id in query params
    if(!req.query.id) return res.send('"id" is not specified in query params')

    const query = 'SELECT * FROM products WHERE id = ?'

    db.query(query, [req.query.id], (err, data) => {
        if(err) return res.send(err)

        //Check if there is a product with the given id in the database
        if(data.length == 0) return res.send(`There is no such data in the database with (id = ${req.query.id})`)
        
        //Destructure the fields
        const { name, brand, price, storage, camera, battery } = data[0]
        
        const query = 'UPDATE products SET `name` = ?, `brand` = ?, `price` = ?, `storage` = ?, `camera` = ?, `battery` = ? WHERE id = ?';
        
        //If user unintentionally forget to send any field in the request body then data from the first API call would be used
        const values = [
            req.body.name ?? name,
            req.body.brand ?? brand,
            req.body.price ?? price,
            req.body.storage ?? storage,
            req.body.camera ?? camera,
            req.body.battery ?? battery,
            req.query.id
        ]
    
        db.query(query, values, (err) => {
            if(err) return res.send(err);
            return res.send('Product updated successfully..!!');
        })
    })
    
})

//Delete a Product
app.delete('/products', (req, res) => {
    if(!req.query.id) return res.send('"id" is not specified in query params');
    
    const query = 'DELETE FROM products WHERE id = ?'

    db.query(query, [req.query.id], (err) => {
        if(err) return res.send(err);
        return res.send('Product deleted successfully..!!')
    })
})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
