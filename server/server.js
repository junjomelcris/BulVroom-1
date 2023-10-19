import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv'
import nodemailer from "nodemailer"

dotenv.config();
const app = express();
app.use(cors({
  origin: '*',
  credentials: true, 
}
    
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));



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
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});



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
    const updatedData = req.body;
  
    const sql = 'UPDATE users SET ? WHERE id = ?';
  
    con.query(sql, [updatedData, id], (err, result) => {
      if (err) {
        console.error('Error updating user data:', err);
        return res.json({ Status: 'Error', Message: 'Failed to update user data' });
      }
  
      if (result.affectedRows === 1) {
        // Successfully updated one row
        return res.json({ Status: 'Success', Message: 'User data updated successfully' });
      } else {
        return res.status(404).json({ Status: 'Error', Message: 'User not found' });
      }
    });
  });
  

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
    const username = req.body.username;
    const password = req.body.password;

    const sql = "SELECT * FROM users WHERE username = ?";

    con.query(sql, [username], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            const hashedPassword = results[0].password;
            const userId = results[0].id;
            // Compare the hashed password with the plaintext password
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    // Handle error
                    return res.status(500).json({ message: "Internal server error" });
                }

                if (result) {
                    // Passwords match, user is authenticated
                    return res.status(200).json({ message: "Success",id: userId });
                } else {
                    // Passwords don't match
                    return res.status(401).json({ message: "incorrect" });
                }
            });
        } else {
            // No user with matching email found
            return res.status(404).json({ message: "notfound" });
        }
    });
});


app.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in running query"});
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

app.get('/logout/app', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})


app.post('/create', upload.single('profile_pic'), (req, res) => {
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if (err) return res.json({ Error: "Error in hashing password" });
  
      const sql = "INSERT INTO `users` (fName, lName, username, email, password, profile_pic, address, contact, driver_license_1, valid_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
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

app.post('/register/app', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const contact = req.body.contact;
  
    const checkUsernameQuery = 'SELECT * FROM users WHERE email = ?';
    con.query(checkUsernameQuery, [email], (err, result) => {
      if (err) {
        console.error('Failed to check email:', err);
        res.send({ message: 'Server error' });
      } else {
        if (result.length > 0) {
          // User already exists
          res.send({ message: 'email already exists' });
        } else {
          // Username is available, proceed with registration
          bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
              console.error('Failed to hash password:', hashErr);
              res.send({ message: 'Server error' });
            } else {

              const verificationToken = generateVerificationToken();
              const insertUserQuery = 'INSERT INTO users (fName, lName, email, password, address, contact, verificationToken) VALUES (?, ?, ?, ?, ?, ?,?)';
              con.query(insertUserQuery, [fName,lName, email, hashedPassword, address, contact, verificationToken], (insertErr, insertResult) => {
                if (insertErr) {
                  console.error('Failed to register user:', insertErr);
                  res.send({ message: 'Server error' });
                } else {
                  // Send verification email
                  const verificationLink = `This is your Verification Code: ${verificationToken}`;
 // Replace with your verification link
                sendVerificationEmail(email, verificationLink); // Send verification email
  
                  res.send({ message: 'User registered successfully' });
                }
              });
            }
          });
        }
      }
    });
  });

  function generateVerificationToken() {
    // Generate a random token
    const token = Math.random().toString(36).substr(2);
    return token;
  }
  
  // Function to send a verification email
  function sendVerificationEmail(email, verificationLink) {
    // Create a transporter for sending emails (replace with your email service provider details)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mindmattersstdominic@gmail.com',
        pass: 'swutnhnnzxmdjytp',
      },
    });
  
    // Setup email data
    const mailOptions = {
      from: 'mindmattersstdominic@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `<p>Thank you for registering. Please click the following link to verify your email:</p>
             <a href="${verificationLink}">${verificationLink}</a>`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send verification email:', error);
      } else {
        console.log('Verification email sent:', info.response);
      }
    });
  }


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
  
  app.put('/verify/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    // Update the 'status' field in the 'users' table to 'verified' for the given user ID
    const updateStatusQuery = 'UPDATE users SET status = ? WHERE id = ?';
    const values = ['approved', userId];
  
    con.query(updateStatusQuery, values, (err, results) => {
      if (err) {
        console.error('Error updating user status:', err);
        return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
      }
  
      if (results.affectedRows === 1) {
        // The query successfully updated one row
        return res.json({ Status: 'Success', Message: 'User status updated to verified' });
      } else {
        return res.status(404).json({ Status: 'Error', Message: 'User not found' });
      }
    });
  });
  app.put('/disApp/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    // Update the 'status' field in the 'users' table to 'verified' for the given user ID
    const updateStatusQuery = 'UPDATE users SET status = ? WHERE id = ?';
    const values = ['disapproved', userId];
  
    con.query(updateStatusQuery, values, (err, results) => {
      if (err) {
        console.error('Error updating user status:', err);
        return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
      }
  
      if (results.affectedRows === 1) {
        // The query successfully updated one row
        return res.json({ Status: 'Success', Message: 'User status updated to verified' });
      } else {
        return res.status(404).json({ Status: 'Error', Message: 'User not found' });
      }
    });
  });
  
//VEHICLE QUERYS --------------------------------------
app.put('/vApp/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updateStatusQuery = 'UPDATE vehicles SET status = ? WHERE vehicle_id = ?';
  const values = ['approved', userId];

  con.query(updateStatusQuery, values, (err, results) => {
    if (err) {
      console.error('Error updating user status:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    }

    if (results.affectedRows === 1) {
      // The query successfully updated one row
      return res.json({ Status: 'Success', Message: 'User status updated to verified' });
    } else {
      return res.status(404).json({ Status: 'Error', Message: 'User not found' });
    }
  });
});

app.put('/vdisApp/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Update the 'status' field in the 'users' table to 'verified' for the given user ID
  const updateStatusQuery = 'UPDATE vehicles SET status = ? WHERE vehicle_id = ?';
  const values = ['disapproved', userId];

  con.query(updateStatusQuery, values, (err, results) => {
    if (err) {
      console.error('Error updating user status:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    }

    if (results.affectedRows === 1) {
      // The query successfully updated one row
      return res.json({ Status: 'Success', Message: 'User status updated to verified' });
    } else {
      return res.status(404).json({ Status: 'Error', Message: 'User not found' });
    }
  });
});

app.delete('/deleteVehicle/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM vehicles WHERE vehicle_id = ?";
  con.query(sql, [id], (err, result) => {
      if(err) return res.json({Error: "delete users error in sql"});
      return res.json({Status: "Success"})
  })
})

app.post('/createVehicle', (req, res) => {
  const {
    id,
    make,
    model,
    type,
    seatingCapacity,
    transmission,
    gas,
    features,
    plate,
    description,
    phone,
    rate,
    deposit,
  } = req.body;

  // Construct the INSERT SQL query
  const insertQuery = `INSERT INTO vehicles (id, make, model, type, seatingCapacity, transmission, gas, features, plate, description, phone, rate, deposit) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Define the values to be inserted into the database
  const values = [
    id,
    make,
    model,
    type,
    seatingCapacity,
    transmission,
    gas,
    features.join(','), // Assuming features is an array, join them into a comma-separated string
    plate,
    description,
    phone,
    rate,
    deposit,
  ];

  // Execute the INSERT query
  con.query(insertQuery, values, (error, results) => {
    if (error) {
      console.error('Error creating a new vehicle:', error);
      res.status(500).json({ Status: 'Error', Message: 'Failed to create a new vehicle' });
    } else {
      console.log('Vehicle created successfully');
      res.status(200).json({ Status: 'Success', Message: 'Vehicle created successfully' });
    }
  });
});
app.post('/createVehicle/app', (req, res) => {
  const {
    userId,
    make,
    model,
    type,
    seatingCapacity,
    transmission,
    gas,
    features,
    plate,
    description,
    phone,
    rate,
    deposit,
    dateAdded,
    status,
    pickupDropoffLocation, // Add pickupDropoffLocation to the request body
  } = req.body;

  // Construct the INSERT SQL query with the pickupDropoffLocation field
  const insertQuery = `INSERT INTO vehicles (id, make, model, type, seatingCapacity, transmission, gas, features, plate, description, phone, rate, deposit, dateAdded, status, pickupDropoffLocation) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Define the values to be inserted into the database, including pickupDropoffLocation
  const values = [
    userId,
    make,
    model,
    type,
    seatingCapacity,
    transmission,
    gas,
    features.join(','), // Assuming features is an array, join them into a comma-separated string
    plate,
    description,
    phone,
    rate,
    deposit,
    dateAdded,
    status,
    pickupDropoffLocation, // Add pickupDropoffLocation to the values array
  ];

  // Execute the INSERT query
  con.query(insertQuery, values, (error, results) => {
    if (error) {
      console.error('Error creating a new vehicle:', error);
      res.status(500).json({ Status: 'Error', Message: 'Failed to create a new vehicle' });
    } else {
      console.log('Vehicle created successfully');
      res.status(200).json({ Status: 'Success', Message: 'Vehicle created successfully' });
    }
  });
});


app.get('/getUsername/:id', (req, res) => {
  const id = req.params.id;

  // Query the database to retrieve the username based on user_id
  const query = 'SELECT username FROM users WHERE id = ?'; // Assuming your users table has a 'username' column

  // Execute the query
  con.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch username' });
    }

    // Check if a user with the given user_id exists
    else if (results.length === 0) {
      return res.status(404).json({ Status: 'Error', Message: 'User not found' });
    }else{

    // Retrieve and send the username in the response
    const username = results[0].username;
    res.json({ Status: 'Success', Result: { username } });}
  });
});

app.get('/getFullname/:id', (req, res) => {
  const id = req.params.id;

  // Query the database to retrieve the username based on user_id
  const query = 'SELECT fName, lName FROM users WHERE id = ?'; // Assuming your users table has a 'username' column

  // Execute the query
  con.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch username' });
    }

    // Check if a user with the given user_id exists
    else if (results.length === 0) {
      return res.status(404).json({ Status: 'Error', Message: 'User not found' });
    }else{

    // Retrieve and send the username in the response
    const fName = results[0].fName;
    const lName = results[0].lName;
    res.json({ Status: 'Success', Result: { fName, lName } });}
  });
});

app.get('/api/approved-vehicles', (req, res) => {
  // Query your database to fetch approved vehicles
  // Replace the database query with your actual query code
  const query = 'SELECT * FROM vehicles WHERE status = ?';
  const status = 'approved';

  // Execute the query to fetch approved vehicles
  con.query(query, [status], (err, results) => {
    if (err) {
      console.error('Error fetching approved vehicles:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    }

    // Send the list of approved vehicles as a JSON response
    res.status(200).json(results);
  });
});

app.get('/user/:id', (req, res) => {
    
  const userId = req.params.id; // Get the user ID from the request parameters
  const query = 'SELECT * FROM users WHERE id = ?'; // Query modified to include the WHERE clause
  con.query(query, [userId], (error, result) => { // Pass the user ID as a parameter to the query
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      if (result.length > 0) {
        res.send(result[0]); // Send the first user data found (assuming the ID is unique)
      } else {
        res.sendStatus(404); // User with the specified ID not found
      }
    }
  });
});


//-------------------------

app.listen(process.env.PORT, ()=> {
    console.log("Running");
})
