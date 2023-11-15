import express, { Router } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv'
import nodemailer from "nodemailer"
const router = express.Router();
import con from '../database.js';

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

router.get('/dashboard',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.id})
})

router.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
router.get('/userCount', (req, res) => {
    const sql = "Select count(id) as users from users";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
router.get('/vCount', (req, res) => {
    const sql = "Select count(id) as vehicles from vehicles";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})



router.post('/login', (req, res) => {
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




router.post('/employeelogin', (req, res) => {
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





router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})




router.post('/create', upload.single('profile_pic'), (req, res) => {
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

router.post('/option', (req, res) => {
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
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bulvroom7@gmail.com', 
      pass: 'ekrlnkgsxzjzalah', 
    },
  });
  router.put('/verify/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    // Fetch the user's email from the database
    const getEmailQuery = 'SELECT email FROM users WHERE id = ?';
    con.query(getEmailQuery, [userId], (err, emailResult) => {
      if (err) {
        console.error('Error fetching user email:', err);
        return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
      }
  
      if (emailResult.length === 1) {
        const userEmail = emailResult[0].email;
  
        // Update the 'status' field in the 'users' table to 'approved' for the given user ID
        const updateStatusQuery = 'UPDATE users SET status = ? WHERE id = ?';
        const values = ['approved', userId];
  
        con.query(updateStatusQuery, values, (updateErr, results) => {
          if (updateErr) {
            console.error('Error updating user status:', updateErr);
            return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
          }
  
          if (results.affectedRows === 1) {
            // The query successfully updated one row
  
            // Send an email to the user notifying them of approval
            const mailOptions = {
              from: 'bulvroom7@gmail.com', // Sender email address
              to: userEmail,                // User's email address
              subject: 'Account Approved',
              text: 'Your account has been approved. You can now rent a Vehicle and add a Vehicl. Enjoy our Platform, THANKYOU!',
            };
  
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent:', info.response);
              }
            });
  
            return res.json({ Status: 'Success', Message: 'User status updated to approved' });
          } else {
            return res.status(404).json({ Status: 'Error', Message: 'User not found' });
          }
        });
      } else {
        return res.status(404).json({ Status: 'Error', Message: 'User not found' });
      }
    });
  });


  router.put('/disApp/:id', (req, res) => {
    const userId = parseInt(req.params.id);
  
    // Fetch the user's email from the database
    const getEmailQuery = 'SELECT email FROM users WHERE id = ?';
    con.query(getEmailQuery, [userId], (err, emailResult) => {
      if (err) {
        console.error('Error fetching user email:', err);
        return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
      }
  
      if (emailResult.length === 1) {
        const userEmail = emailResult[0].email;
  
        // Update the 'status' field in the 'users' table to 'disapproved' for the given user ID
        const updateStatusQuery = 'UPDATE users SET status = ? WHERE id = ?';
        const values = ['disapproved', userId];
  
        con.query(updateStatusQuery, values, (updateErr, results) => {
          if (updateErr) {
            console.error('Error updating user status:', updateErr);
            return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
          }
  
          if (results.affectedRows === 1) {
            // The query successfully updated one row
  
            // Send an email to the user notifying them of disapproval
            const mailOptions = {
              from: 'bulvroom7@gmail.com', // Sender email address
              to: userEmail,                // User's email address
              subject: 'Account Disapproved',
              text: 'Your account has been disapproved. Please contact support for more information.',
            };
  
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent:', info.response);
              }
            });
  
            return res.json({ Status: 'Success', Message: 'User status updated to disapproved' });
          } else {
            return res.status(404).json({ Status: 'Error', Message: 'User not found' });
          }
        });
      } else {
        return res.status(404).json({ Status: 'Error', Message: 'User not found' });
      }
    });
  });

  router.delete('/deleteVehicle/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM vehicles WHERE vehicle_id = ?";
  con.query(sql, [id], (err, result) => {
      if(err) return res.json({Error: "delete users error in sql"});
      return res.json({Status: "Success"})
  })
})

router.post('/createVehicle', (req, res) => {
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

export default router;