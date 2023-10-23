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
import vehicleRouter from '../Routes/VehicleRoute/Vehicle.js'; 
import userRouter from '../Routes/UserRoute/User.js'; 
import adminRouter from '../Routes/Admin/Admin.js'; 




const app = express();
app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);


// Connection to the database
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Establish the database connection
con.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    setTimeout(handleDisconnect, 2000);
  } else {
    console.log('Connected to the database');
  }
});
con.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleDisconnect();
  } else {
    throw err;
  }
});

function handleDisconnect() {
  

  con.connect((err) => {
    if (err) {
      console.error('Error connecting to database (reconnect):', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  con.on('error', (err) => {
    console.error('Database error (reconnect):', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

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
