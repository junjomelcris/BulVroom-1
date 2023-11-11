import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  
  // Establish the database connection
  con.connect((err) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

export default con;
