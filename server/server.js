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
        methods: ["POST", "GET", "PUT"],
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

app.get('/salary', (req, res) => {
    const sql = "Select sum(salary) as sumOfSalary from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM admin Where email = ? AND  password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
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
    const sql = "SELECT * FROM admin Where email = ? AND  password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
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
        hash,                          // Assuming 'is_verified' is initially set to false
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

app.listen(8082, ()=> {
    console.log("Running");
})
