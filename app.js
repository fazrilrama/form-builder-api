import express from 'express';
import apiRouter from './routes/api.js'
import connection from './connection.js';
import dotenv from 'dotenv'

const env = dotenv.config().parsed
// console.log(env);
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter);

// 404 Not Found
app.use((req, res) => {
    res.status(404).json({ message: '404_NOT_FOUND' });
})

// MongoDB Connection
connection()

app.listen(env.APP_PORT, () => {
    console.log(`Server started on port ${env.APP_PORT}...`);
})