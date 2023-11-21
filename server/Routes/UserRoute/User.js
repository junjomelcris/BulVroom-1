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
//const crypto = require('crypto');
import crypto from 'crypto'



router.get('/getUsers', (req, res) => {
  const sql = "SELECT * FROM users";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get users error in sql" });
    return res.json({ Status: "Success", Result: result })
  })
})

router.get('/user/:userId/vehicles', (req, res) => {
  const userId = req.params.userId;
  const sql = `SELECT * FROM vehicles WHERE id = ?`;

  con.query(sql, userId, (err, result) => {
    if (err) {
      console.error('Error executing SQL query: ' + err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(result);
  });
});

router.get('/getVehicles', (req, res) => {
  const sql = "SELECT * FROM vehicles";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get users error in sql" });
    return res.json({ Status: "Success", Result: result })
  })
})

router.get('/get/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get users error in sql" });
    return res.json({ Status: "Success", Result: result })
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
    if (err) return res.json({ Error: "delete users error in sql" });
    return res.json({ Status: "Success" })
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
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (result) {
          // Passwords match, user is authenticated
          return res.status(200).json({ message: "Success", id: userId });
        } else {
          // Passwords don't match
          return res.status(401).json({ message: "Incorrect username or password" });
        }
      });
    } else {
      // No user with matching username found
      return res.status(404).json({ message: "User not found" });
    }
  });
});


router.get('/logout/app', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "Success" });
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

router.post('/change-password', (req, res) => {
  const userId = req.body.userId; // Assuming you send the user's ID along with the request
  const newPassword = req.body.newPassword;

  // Hash the new password
  bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Failed to hash new password:', hashErr);
      res.send({ message: 'Server error' });
    } else {
      // Update the user's password in the database
      const updatePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
      con.query(updatePasswordQuery, [hashedPassword, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Failed to update password:', updateErr);
          res.send({ message: 'Server error' });
        } else {
          res.send({ message: 'Password changed successfully' });
        }
      });
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
      user: 'bulvroom7@gmail.com',
      pass: 'ekrlnkgsxzjzalah',
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'bulvroom7@gmail.com',
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
    } else {

      // Retrieve and send the username in the response
      const username = results[0].username;
      res.json({ Status: 'Success', Result: { username } });
    }
  });
});

router.get('/getFullname/:id', (req, res) => {
  const id = req.params.id;

  // Query the database to retrieve the username based on user_id
  const query = 'SELECT fName, lName, profile_pic FROM users WHERE id = ?'; // Assuming your users table has a 'username' column

  // Execute the query
  con.query(query, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ Status: 'Error', Message: 'Failed to fetch username' });
    }

    // Check if a user with the given user_id exists
    else if (results.length === 0) {
      return res.status(404).json({ Status: 'Error', Message: 'User not found' });
    } else {

      // Retrieve and send the username in the response
      const fName = results[0].fName;
      const lName = results[0].lName;
      const profile_pic = results[0].profile_pic;
      res.json({ Status: 'Success', Result: { fName, lName, profile_pic } });
    }
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

router.put("/Upload/:id", (req, res) => {
  const UserId = req.params.id;
  const Updatequery = "UPDATE users SET `profile_pic`= ? WHERE id = ?";

  const values = [
    req.body.image,
  ];

  con.query(Updatequery, [...values, UserId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

router.put("/Valid/:id", (req, res) => {
  const UserId = req.params.id;
  const Updatequery = "UPDATE users SET `valid_id`= ? WHERE id = ?";

  const values = [
    req.body.image,
  ];

  con.query(Updatequery, [...values, UserId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

router.put("/License/:id", (req, res) => {
  const UserId = req.params.id;
  const Updatequery = "UPDATE users SET `driver_license_1`= ? WHERE id = ?";

  const values = [
    req.body.image,
  ];

  con.query(Updatequery, [...values, UserId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

router.get('/users', (req, res) => {
  const query = 'SELECT * FROM users'; // Select all data from the "users" table
  con.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.json(results); // Send all user data as a JSON response
    }
  });
});

router.post('/verification', (req, res) => {
  const userProvidedVerification = req.body.verificationCode;

  // Query the database to check if the provided OTP exists in the user_info table
  const verifyQuery = 'SELECT * FROM users WHERE verificationToken = ?';

  con.query(verifyQuery, [userProvidedVerification], (error, results) => {
    if (error) {
      console.error('Failed to verify code:', error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    } else {
      if (results.length > 0) {
        // If there is a match, update the is_verified column to 1
        const userId = results[0].id; // Replace 'id' with the actual primary key column name in your 'users' table
        const updateQuery = 'UPDATE users SET is_verified = 1 WHERE id = ?';

        con.query(updateQuery, [userId], (updateError) => {
          if (updateError) {
            console.error('Failed to update is_verified column:', updateError);
            res.status(500).json({ error: 'Failed to update is_verified column' });
          } else {
            res.send({ message: 'match' });
          }
        });
      } else {
        // If no results are returned, the provided OTP does not exist in the table
        res.send({ message: 'not match' });
      }
    }
  });
});


router.get('/notifications/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const query = 'SELECT notifications.*, vehicles.* FROM notifications LEFT JOIN vehicles ON notifications.vehicle_id = vehicles.vehicle_id WHERE notifications.user_id = ? OR (notifications.is_admin_made = 1 AND notifications.user_id = ?)';

  con.query(query, [userId, userId], (error, results) => {
    if (error) {
      console.error('Failed to fetch notifications:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post('/notifications', (req, res) => {
  const { title, label, date_time, user_id, vehicle_id } = req.body;
  const query = 'INSERT INTO notifications (title, label, date_time, user_id, vehicle_id) VALUES (?, ?, ?, ?, ?)';

  con.query(query, [title, label, date_time, user_id, vehicle_id], (error, results) => {
    if (error) {
      console.error('Failed to insert notification:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

router.get('/mybookings/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const query = `
    SELECT transactions.id AS transaction_id, transactions.status AS transaction_status, transactions.*, vehicles.*
    FROM transactions
    LEFT JOIN vehicles ON transactions.vehicle_id = vehicles.vehicle_id
    WHERE transactions.booker_id = ${user_id}`;

  con.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.delete('/mybookings/delete/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM transactions WHERE id = ${id}`;

  con.query(query, (error, result) => {
    if (error) {
      console.error('Failed to delete entry:', error);
      res.sendStatus(500);
    } else {
      if (result.affectedRows > 0) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    }
  });
});

router.get('/bookedvehicle/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const query = `
    SELECT transactions.id AS transaction_id, transactions.status AS transaction_status, transactions.*, vehicles.*, users.*
    FROM transactions
    LEFT JOIN vehicles ON transactions.vehicle_id = vehicles.vehicle_id
    LEFT JOIN users ON transactions.owner_id = users.id
    WHERE transactions.owner_id = ${user_id}`;

  con.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.put('/bookedvehicle/:transaction_id', (req, res) => {
  const transaction_id = req.params.transaction_id;
  const newStatus = req.body.status; // Assuming the new status is sent in the request body

  if (!newStatus) {
    return res.status(400).json({ error: 'New status is required' });
  }

  // Step 1: Get the transaction row using the transaction_id and store it in a variable
  const getTransactionQuery = `
    SELECT * FROM transactions
    WHERE id = ${transaction_id}`;

  con.query(getTransactionQuery, (error, transaction) => {
    if (error) {
      console.error('Failed to retrieve transaction:', error);
      return res.sendStatus(500);
    }

    if (!transaction || transaction.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Step 2: Edit the status as in the current example
    const updateQuery = `
      UPDATE transactions
      SET status = '${newStatus}'
      WHERE id = ${transaction_id}`;

    con.query(updateQuery, (updateError, updateResults) => {
      if (updateError) {
        console.error('Failed to update status:', updateError);
        return res.sendStatus(500);
      }

      // Step 3: Get all the transaction rows using the vehicle_id column
      const vehicle_id = transaction[0].vehicle_id;
      const getAllTransactionsQuery = `
        SELECT * FROM transactions
        WHERE vehicle_id = ${vehicle_id}`;

      con.query(getAllTransactionsQuery, (getAllError, allTransactions) => {
        if (getAllError) {
          console.error('Failed to retrieve all transactions:', getAllError);
          return res.sendStatus(500);
        }

        // Step 4: Set all the other status columns of the rows to 3 only if the current status is 1
        const updateAllQuery = `
                              UPDATE transactions
                              SET status = 3
                              WHERE vehicle_id = ${vehicle_id}
                                AND status = 1
                                AND id != ${transaction_id}`;

        con.query(updateAllQuery, (updateAllError, updateAllResults) => {
          if (updateAllError) {
            console.error('Failed to update all transactions status:', updateAllError);
            return res.sendStatus(500);
          }

          res.json({ message: 'Status updated successfully' });
        });
      });
    });
  });
});

// POST route for adding a rating
router.post('/ratings', (req, res) => {
  const { rating, comment, vehicle_id, user_id } = req.body;

  if (!rating || !comment || !vehicle_id || !user_id) {
    return res.status(400).json({ error: 'All fields (rating, comment, vehicle_id, user_id) are required' });
  }

  const addRatingQuery = `
    INSERT INTO ratings (rating, comment, vehicle_id, user_id)
    VALUES (${rating}, '${comment}', ${vehicle_id}, ${user_id})`;

  con.query(addRatingQuery, (error, results) => {
    if (error) {
      console.error('Failed to add rating:', error);
      return res.sendStatus(500);
    }

    res.json({ message: 'Rating added successfully' });
  });
});

// GET route for fetching ratings
router.get('/ratings/:vehicle_id', (req, res) => {
  const vehicle_id = req.params.vehicle_id;

  const getRatingsQuery = `
    SELECT ratings.*, users.*
    FROM ratings
    LEFT JOIN users ON ratings.user_id = users.id
    WHERE ratings.vehicle_id = ${vehicle_id}`;

  con.query(getRatingsQuery, (error, ratings) => {
    if (error) {
      console.error('Failed to retrieve ratings:', error);
      return res.sendStatus(500);
    }

    res.json({ ratings });
  });
});

router.post('/forget-password', (req, res) => {
  const userEmail = req.body.email;

  const resetCode = generateRandomCode();

  const findUserQuery = 'SELECT id FROM users WHERE email = ?';
  con.query(findUserQuery, [userEmail], (findErr, findResult) => {
    if (findErr) {
      console.error('Error finding user:', findErr);
      res.send({ message: 'Server error' });
    } else if (findResult.length === 0) {
      res.send({ message: 'User not found' });
    } else {
      const userId = findResult[0].id;
      const updateCodeQuery = 'UPDATE users SET forget_code = ? WHERE id = ?';
      con.query(updateCodeQuery, [resetCode, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Failed to update forget code:', updateErr);
          res.send({ message: 'Server error' });
        } else {

          sendForgetPasswordEmail(userEmail, resetCode);

          res.send({ message: 'Reset code sent successfully' });
        }
      });
    }
  });
});

function sendForgetPasswordEmail(email, code) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bulvroom7@gmail.com',
      pass: 'ekrlnkgsxzjzalah',
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'bulvroom7@gmail.com',
    to: email,
    subject: 'Forget Password Email',
    html: `<p>Here is your forget password code: ${code}</p>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send email:', error);
    } else {
      console.log('email sent:', info.response);
    }
  });
}

function generateRandomCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // Adjust the length as needed
}

router.get('/reset-code/:code', (req, res) => {
  const verificationCode = req.params.code;

  const checkCodeQuery = 'SELECT id FROM users WHERE forget_code = ?';
  con.query(checkCodeQuery, [verificationCode], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking verification code:', checkErr);
      res.status(500).json({ message: 'Server error' });
    } else if (checkResult.length === 0) {
      res.status(404).json({ message: 'Invalid code' });
    } else {
      const userId = checkResult[0].id;
      res.json({ userId: userId });
    }
  });
});


export default router;