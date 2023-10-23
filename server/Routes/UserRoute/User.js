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



router.get('/getUsers', (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get users error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})


router.get('/getVehicles', (req, res) => {
    const sql = "SELECT * FROM vehicles";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get users error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get users error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})


router.put('/update/:id', (req, res) => {
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
  

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete users error in sql"});
        return res.json({Status: "Success"})
    })
})

router.post('/login/app', (req, res) => {
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

router.get('/logout/app', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
  })


router.post('/register/app', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const username = req.body.username; // Added username field
    const password = req.body.password;
    const address = req.body.address;
    const contact = req.body.contact;
  
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  
    // Check if the email is already registered
    con.query(checkEmailQuery, [email], (emailErr, emailResult) => {
      if (emailErr) {
        console.error('Failed to check email:', emailErr);
        res.send({ message: 'Server error' });
      } else {
        if (emailResult.length > 0) {
          // Email already exists
          res.send({ message: 'Email already exists' });
        } else {
          // Check if the username is already registered
          con.query(checkUsernameQuery, [username], (usernameErr, usernameResult) => {
            if (usernameErr) {
              console.error('Failed to check username:', usernameErr);
              res.send({ message: 'Server error' });
            } else {
              if (usernameResult.length > 0) {
                // Username already exists
                res.send({ message: 'Username already exists' });
              } else {
                // Email and username are available, proceed with registration
                bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                  if (hashErr) {
                    console.error('Failed to hash password:', hashErr);
                    res.send({ message: 'Server error' });
                  } else {
                    const verificationToken = generateVerificationToken();
                    const insertUserQuery =
                      'INSERT INTO users (fName, lName, email, username, password, address, contact, verificationToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                    con.query(
                      insertUserQuery,
                      [fName, lName, email, username, hashedPassword, address, contact, verificationToken],
                      (insertErr, insertResult) => {
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
                      }
                    );
                  }
                });
              }
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
        user: 'bulvroom0@gmail.com',
        pass: 'kriolqgjqkjcxfey',
      },
    });
  
    // Setup email data
    const mailOptions = {
      from: 'bulvroom0@gmail.com',
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


  router.get('/getUsername/:id', (req, res) => {
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

  router.get('/getFullname/:id', (req, res) => {
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


  router.get('/user/:id', (req, res) => {
    
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

  router.put("/Upload/:id",(req, res) => {
    const UserId = req.params.id;
    const Updatequery = "UPDATE users SET `profile_pic`= ? WHERE id = ?";
  
    const values = [
      req.body.image,
    ];
  
    con.query(Updatequery, [...values,UserId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  router.put("/Valid/:id",(req, res) => {
    const UserId = req.params.id;
    const Updatequery = "UPDATE users SET `valid_id`= ? WHERE id = ?";
  
    const values = [
      req.body.image,
    ];
  
    con.query(Updatequery, [...values,UserId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  router.put("/License/:id",(req, res) => {
    const UserId = req.params.id;
    const Updatequery = "UPDATE users SET `driver_license_1`= ? WHERE id = ?";
  
    const values = [
      req.body.image,
    ];
  
    con.query(Updatequery, [...values,UserId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  

  router.post('/verification', (req, res) => {
    const userProvidedVerification = req.body.verificationCodes;
  
    // Query the database to check if the provided OTP exists in the user_info table
    const verifyQuery = 'SELECT * FROM users WHERE verificationToken = ?';
  
    con.query(verifyQuery, [userProvidedVerification], (error, results) => {
      if (error) {
        console.error('Failed to verify code:', error);
        res.status(500).json({ error: 'Failed to verify OTP' });
      } else {
        if (results.length > 0) {
    
          res.send({ message: 'match' });
        } else {
          // If no results are returned, the provided OTP does not exist in the table
          res.send({ message: 'not match' });
        }
      }
    });
  });

  export default router;