import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'root123',
    database: process.env.DATABASE || 'dep_order_service_db',
    port: process.env.DB_PORT || 3306
})