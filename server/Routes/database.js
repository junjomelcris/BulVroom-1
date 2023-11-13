import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

function handleDisconnect() {
  const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  con.connect((err) => {
    if (err) {
      console.error('Error connecting to database (reconnect):', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Reconnected to the database');
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

  return con; // Return the connection object
}

const con = handleDisconnect();

export default con;
