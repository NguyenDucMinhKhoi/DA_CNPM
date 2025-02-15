import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import initRoutes from './src/routes/index.js'; // Phải có .js ở cuối

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app); // Kết nối router với server

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});