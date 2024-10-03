import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express()
const PORT = process.env.PORT

// app.use(express.json())
app.use(cors())

const services = {
    user: 'http://localhost:3520',
    product: 'http://localhost:3530',
    inventory: 'http://localhost:3540',
    order: 'http://localhost:3550',
    payment: 'http://localhost:3560',
};
  
// Proxy endpoints
app.use('/api/users', createProxyMiddleware({
    target: services.user,
    changeOrigin: true,
    // pathRewrite: {
    //     '^/api/users': '', // Remove /api/users prefix
    // },
    onError: (err, req, res) => {
        console.error('Error connecting to User Service:', err);
        res.status(500).json({ error: 'Cannot connect to User Service' });
    }
}));
app.use('/api/products', createProxyMiddleware({
    target: services.product,
    changeOrigin: true,
    onError: (err, req, res) => {
        console.error('Error connecting to Product Service:', err);
        res.status(500).json({ error: 'Cannot connect to Product Service' });
    }
}));
app.use('/api/inventory', createProxyMiddleware({
    target: services.inventory,
    changeOrigin: true,
    onError: (err, req, res) => {
        console.error('Error connecting to Inventory Service:', err);
        res.status(500).json({ error: 'Cannot connect to Inventory Service' });
    }
}));
app.use('/api/orders', createProxyMiddleware({
    target: services.order,
    changeOrigin: true,
    onError: (err, req, res) => {
        console.error('Error connecting to Inventory Service:', err);
        res.status(500).json({ error: 'Cannot connect to Inventory Service' });
    }
}));
// app.use('/api/payments', createProxyMiddleware({ target: services.payment, changeOrigin: true }));
  

app.listen(PORT, () => {
    console.log(`API GATEWAY is running on port ${PORT}`)
})