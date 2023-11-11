import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import http from 'http'; // Change require to import here
import nodemailer from 'nodemailer';
import vehicleRouter from './Routes/VehicleRoute/Vehicle.js'; 
import userRouter from './Routes/UserRoute/User.js'; 
import adminRouter from './Routes/Admin/Admin.js'; 




const app = express();
app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);



app.use(express.static('public'));
app.use(vehicleRouter);
app.use(userRouter);
app.use(adminRouter);

// Add this route to your server code
app.get('/keep-alive', (req, res) => {
  res.send('Server is alive');
});

const port = process.env.PORT; // Use a default port if PORT is not defined
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
