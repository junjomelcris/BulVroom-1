import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bulvroom"
});
con.connect(function (err) {
    if (err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
});

app.get('/pages/users', (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error in Server" });
        return res.json(result);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM admin Where email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            return res.json({ Status: "Success" });
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    });
});

app.post('/pages/users', (req, res) => {
    console.log(req.body); // Log the received request body

    // Hash the password using bcrypt
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.json({ Status: "Error", Error: "Failed to hash the password" });
        }

        const sql = "INSERT INTO users (name, email, lastName, password, age, contact, address) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.name,
            req.body.email,
            req.body.lastName,
            hashedPassword, // Store the hashed password in password column
            req.body.age,
            req.body.contact,
            req.body.address
        ];

        console.log("SQL Query:", sql); // Log the SQL query for debugging
        console.log("Values:", values); // Log the values being inserted for debugging

        con.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error during INSERT:", err);
                return res.json({ Status: "Error", Error: "Failed to add user to the database" });
            }

            console.log("Insertion Successful");
            return res.json({ Status: "Success", Message: "User added to the database" });
        });
    });
});
app.get('/api/getRegisteredUsersCount', (req, res) => {
    const sql = 'SELECT COUNT(*) AS userCount FROM users';
  
    con.query(sql, (err, result) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Error fetching data' });
        return;
      }
  
      const userCount = result[0].userCount;
      res.json({ count: userCount });
    });
  });
app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id=?";
    const id = req.params.id;

    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error in Server" });
        }
        return res.json(result);
    });
});

app.put('/edit/:id', (req, res) => {
    const sql = 'UPDATE users SET name = ?, email = ?, lastName = ?, password = ?, age = ?, contact = ?, address = ? WHERE id = ?';
    const id = req.params.id;
    const { name, email, lastName, password, age, contact, address } = req.body;

    con.query(sql, [name, email, lastName, password, age, contact, address, id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id=?";
    const id = req.params.id;
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log("Running");
});
