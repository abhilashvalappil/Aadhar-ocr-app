import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './interfaces/routes/ocrRouter';
dotenv.config();
console.log('CLIENT_URI:', process.env.CLIENT_URI);

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URI, 
  credentials: true
}));
app.use(express.json());
app.use('/', router);
app.use('/uploads', express.static('uploads'));

export default app;
