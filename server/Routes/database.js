import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

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

export default con;
