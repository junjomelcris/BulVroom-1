import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bulroomcap"
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

app.get('/getUsers', (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get users error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
app.get('/getVehicles', (req, res) => {
    const sql = "SELECT * FROM vehicles";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get users error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})


app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get users error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee set salary = ? WHERE id = ?";
    con.query(sql, [req.body.salary, id], (err, result) => {
        if(err) return res.json({Error: "update users error in sql"});
        return res.json({Status: "Success"})
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete users error in sql"});
        return res.json({Status: "Success"})
    })
})

app.delete('/deleteVehicle/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM vehicles WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete users error in sql"});
        return res.json({Status: "Success"})
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are no Authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        } )
    }
}

app.get('/dashboard',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.id})
})

app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
app.get('/userCount', (req, res) => {
    const sql = "Select count(id) as users from users";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
app.get('/vCount', (req, res) => {
    const sql = "Select count(id) as vehicles from vehicles";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})



app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const sql = "SELECT * FROM admin Where email = ? AND  password = ?";
    con.query(sql, [email, password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

app.post('/login/app', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";

    con.query(sql, [email, password], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            // User with matching email and password found
            return res.status(200).json({ message: "User found" });
        } else {
            // No user with matching email and password
            return res.status(404).json({ message: "User not found" });
        }
    });
});






app.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "password error"});
                if(response) {
                    const token = jwt.sign({role: "employee", id: result[0].id}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success", id: result[0].id})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
                
            })
            
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})





app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.post('/create', upload.single('profile_pic'), (req, res) => {
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err) return res.json({ Error: "Error in hashing password" });
  
      const sql = "INSERT INTO `users` (fName, lName, username, email, password, profile_pic, address, contact, driver_license_1, driver_license_2, valid_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
      const values = [
        req.body.fName,               // Assuming you have a 'fName' field in your form
        req.body.lName,               // Assuming you have a 'lName' field in your form
        req.body.username,            // Assuming you have a 'username' field in your form
        req.body.email,               // Assuming you have an 'email' field in your form
        hash,                     // Assuming 'is_verified' is initially set to false
        req.file.filename,            // Assuming this is the filename of the uploaded profile picture
        req.body.address,             // Assuming you have an 'address' field in your form
        req.body.contact,
        req.body.driver_license_1,
        req.body.driver_license_2,
        req.body.valid_id 

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


// Endpoint to save selected options
app.post('/option', (req, res) => {
    const { selectedOptions } = req.body;
  
    // Ensure that the table name matches the actual table name in your database
    const tableName = 'YourTable'; // Replace with your actual table name
  
    // Insert the data into the table using a parameterized query
    const query = {
      text: 'INSERT INTO ' + tableName + ' (Data) VALUES ($1) RETURNING *',
      values: [selectedOptions],
    };
  
    con.query(query, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ message: 'Error inserting data' });
      } else {
        console.log('Data inserted successfully:', result.rows[0]);
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  });
  
  

app.listen(8082, ()=> {
    console.log("Running");
})
