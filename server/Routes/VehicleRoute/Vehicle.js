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


router.put('/api/validate-gcash/:transactionId', async (req, res) => {
  const { gcash_ref_no } = req.body;
  const { transactionId } = req.params;

  try {
    // Update the transaction status
    await updateGcashReference(transactionId, gcash_ref_no);

    // Fetch the owner's email from the database
    const ownerEmail = await getOwnerEmail(transactionId, gcash_ref_no);

    // Send an email to the owner
    await sendGcashReferenceEmail(ownerEmail, gcash_ref_no);

    res.status(200).json({ message: 'Reference number updated successfully' });
  } catch (error) {
    console.error('Error updating GCash reference number:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function updateGcashReference(transactionId, gcashRefNo) {
  // Update the transaction with the GCash reference number
  const updateQuery = `
    UPDATE transactions 
    SET gcash_ref_no = ?
    WHERE id = ?
  `;

  const updateValues = [gcashRefNo, transactionId];

  try {
    await con.query(updateQuery, updateValues);
  } catch (error) {
    throw new Error('Error updating GCash reference number');
  }
}

// Function to fetch the owner's email from the database
async function getOwnerEmail(transactionId, gcash_ref_no) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT users.email FROM transactions JOIN users ON transactions.owner_id = users.id WHERE transactions.id = ?';

    con.query(query, [transactionId], (error, result) => {
      if (error) {
        console.error('Error fetching owner email:', error);
        reject(error);
      } else {
        if (result.length > 0) {
          const ownerEmail = result[0].email;
          console.log('Owner Email:', ownerEmail);
          // Resolve with the owner's email
          resolve(ownerEmail);
        } else {
          console.log('No owner email found for transaction ID:', transactionId);
          // Reject with an appropriate error
          reject(new Error('No owner email found'));
        }
      }
    });
  });
}

// Function to send the email to the owner
async function sendGcashReferenceEmail(email, referenceNumber) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bulvroom7@gmail.com',
        pass: 'ekrlnkgsxzjzalah',
      },
    });

    const mailOptions = {
      from: 'bulvroom7@gmail.com',
      to: email,
      subject: 'GCash Reference Number Update',
      html: `<p>Your GCash reference number ${referenceNumber} has been received. Please check your GCash account.</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending GCash reference email');
  }
}




router.post('/api/transaction', async (req, res) => {
  const {
    vehicleId,
    ownerId,
    booker_id,
    pickup_location,
    vehiclepickupDropoffLocation,
    selectedPickupDate,
    selectedDropoffDate,
    rate,
    daysRented,
    totalPayment,
    userId,
    ownerEmail,
    payment_method,
    gcash_ref_no
  } = req.body;

  const query = `
    INSERT INTO transactions 
    (vehicle_id, owner_id, booker_id, pickup_location, dropoff_location, pickup_datetime, dropoff_datetime, rate, days_rented, total_payment, payment_method, gcash_ref_no) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    vehicleId,
    ownerId,
    userId,
    vehiclepickupDropoffLocation,
    vehiclepickupDropoffLocation,
    selectedPickupDate,
    selectedDropoffDate,
    rate,
    daysRented,
    totalPayment,
    payment_method,
    gcash_ref_no
  ];

  try {
    con.query(query, values, (error, result) => {
      if (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        const insertedTransactionId = result.insertId;
        res.status(201).json({ message: 'Transaction created', transactionId: insertedTransactionId });
        sendNotificationEmail(ownerEmail);
      }
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

  const sendNotificationEmail = (email) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bulvroom7@gmail.com',
        pass: 'ekrlnkgsxzjzalah',
      },
    });

    const mailOptions = {
      from: 'bulvroom7@gmail.com',
      to: email,
      subject: 'Vehicle Rent Request',
      html: `<p>One of Your Vehicle is requested for to be rented. Please check your Vehicle list within the mobile app.</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent:');
      }
    });
  }
});

router.put('/api/transaction/:transactionId', async (req, res) => {
  const { gcash_ref_no } = req.body;
  const { transactionId } = req.params;

  const query = `
    UPDATE transactions 
    SET gcash_ref_no = ?
    WHERE id = ?
  `;

  const values = [gcash_ref_no, transactionId];

  try {
    con.query(query, values, (error, result) => {
      if (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Transaction updated' });
      }
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/bookmark-vehicle', (req, res) => {
  const { userId, vehicleId } = req.body;
  const insertBookmarkQuery = 'INSERT INTO user_bookmarks (user_id, vehicle_id) VALUES (?, ?)';
  const values = [userId, vehicleId];

  con.query(insertBookmarkQuery, values, (err, results) => {
    if (err) {
      console.error('Error bookmarking the vehicle:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    }

    return res.json({ Status: 'Success', Message: 'Vehicle bookmarked successfully' });
  });
});

// Endpoint to unbookmark a vehicle
router.delete('/unbookmark-vehicle/:userId/:vehicleId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const vehicleId = parseInt(req.params.vehicleId);
  const deleteBookmarkQuery = 'DELETE FROM user_bookmarks WHERE user_id = ? AND vehicle_id = ?';
  const values = [userId, vehicleId];

  con.query(deleteBookmarkQuery, values, (err, results) => {
    if (err) {
      console.error('Error unbookmarking the vehicle:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    }

    if (results.affectedRows === 1) {
      return res.json({ Status: 'Success', Message: 'Vehicle unbookmarked successfully' });
    } else {
      return res.status(404).json({ Status: 'Error', Message: 'Bookmark not found' });
    }
  });
});

router.put('/vApp/:id', (req, res) => {
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

router.put('/vdisApp/:id', (req, res) => {
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

router.post('/createVehicle/app', (req, res) => {
  const {
    userId,
    make,
    model,
    type,
    vehicle_image,
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
    chassis_number
  } = req.body;

  // Construct the INSERT SQL query with the pickupDropoffLocation field
  const insertQuery = `INSERT INTO vehicles (id, make, model, type, chassis_number, vehicle_image, seatingCapacity, transmission, gas, features, plate, description, phone, rate, deposit, dateAdded, status, pickupDropoffLocation) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Define the values to be inserted into the database, including pickupDropoffLocation
  const values = [
    userId,
    make,
    model,
    type,
    chassis_number,
    vehicle_image,
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

router.get('/api/approved-vehicles', (req, res) => {
  const query = `
    SELECT vehicles.*, rating_data.rating_count, rating_data.rating_values
    FROM vehicles
    LEFT JOIN (
      SELECT vehicle_id, COUNT(vehicle_id) AS rating_count, GROUP_CONCAT(rating) AS rating_values
      FROM ratings
      GROUP BY vehicle_id
    ) AS rating_data ON vehicles.vehicle_id = rating_data.vehicle_id
    LEFT JOIN transactions ON vehicles.vehicle_id = transactions.vehicle_id
    WHERE vehicles.status = ? AND (transactions.vehicle_id IS NULL OR transactions.status <> 2)
    GROUP BY vehicles.vehicle_id`;

  const status = 'approved';

  con.query(query, [status], (err, results) => {
    if (err) {
      console.error('Error fetching approved vehicles:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    }

    res.status(200).json(results);
  });
});

router.get('/api/vehicles-per-type-count', (req, res) => {
  const query = `
    SELECT vehicles.type, COUNT(*) as count
    FROM vehicles
    WHERE status = ?
    GROUP BY vehicles.type
  `;

  const status = 'approved';

  con.query(query, [status], (err, results) => {
    if (err) {
      console.error('Error fetching approved vehicles:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    }

    res.status(200).json(results);
  });
});

router.get('/api/user-vehicle-count', (req, res) => {
  const query = `
    SELECT users.id, CONCAT(users.fName, ' ', users.lName) AS fullName, COUNT(vehicles.id) AS vehicleCount
    FROM users
    LEFT JOIN vehicles ON users.id = vehicles.id
    GROUP BY users.id
  `;

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user vehicle counts:', err);
      return res.status(500).json({ Status: 'Error', Message: 'Internal Server Error' });
    }

    res.status(200).json(results);
  });
});

router.get('/api/vehicles', async (req, res) => {
  try {
    const { searchText, filterType, filterComponent } = req.query;

    // Construct the SQL query based on the parameters
    let sql = `
  SELECT 
    *
  FROM 
    vehicles
`;

    // Conditionally add filters based on the query parameters
    const params = [];

    if (searchText) {
      sql += ` AND (make LIKE ? OR model LIKE ?)`;
      params.push(`%${searchText}%`);
      params.push(`%${searchText}%`);
    }

    if (filterType && filterType !== 'All') {
      sql += ` AND type = ?`;
      params.push(filterType);
    }

    if (filterComponent && filterComponent !== 'All') {
      sql += ` AND features LIKE ?`;
      params.push(`%${filterComponent}%`);
    }

    // Execute the SQL query
    const results = await db.query(sql, params);

    res.json(results);
  } catch (error) {
    console.error('Error in /api/vehicles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/transactions', (req, res) => {
  const query = 'SELECT transactions.*, CONCAT(users.fName, " ", users.lName) AS fullname, CONCAT(owners.fName, " ", owners.lName) AS owner FROM transactions LEFT JOIN users ON transactions.booker_id = users.id LEFT JOIN users AS owners ON transactions.owner_id = owners.id';
  con.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.get('/renterbookings', (req, res) => {
  const {
    user_id,
  } = req.body;

  const query = 'SELECT * FROM transactions WHERE owner_id = ?';

  con.query(query, [user_id], (error, results) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.get('/vehicles', (req, res) => {
  const query = 'SELECT * FROM vehicles'; // Select all data from the "users" table
  con.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.json(results); // Send all user data as a JSON response
    }
  });
});

router.put('/update-vehicle-image/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId;
  const newVehicleImage = req.body.vehicleImage; // Assuming you send the new image URL in the request body

  // Update the vehicle_image column in the vehicles table
  const updateImageQuery = 'UPDATE vehicles SET vehicle_image = ? WHERE vehicle_id = ?';
  con.query(updateImageQuery, [newVehicleImage, vehicleId], (updateErr, updateResult) => {
    if (updateErr) {
      console.error('Failed to update vehicle image:', updateErr);
      res.status(500).json({ message: 'Server error' });
    } else if (updateResult.affectedRows === 0) {
      // No rows were affected, meaning the vehicle with the specified ID was not found
      res.status(404).json({ message: 'Vehicle not found' });
    } else {
      res.json({ message: 'Vehicle image updated successfully' });
    }
  });
});

router.delete('/delete-vehicle/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId;

  // Delete the vehicle entry from the vehicles table
  const deleteVehicleQuery = 'DELETE FROM vehicles WHERE vehicle_id = ?';
  con.query(deleteVehicleQuery, [vehicleId], (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error('Failed to delete vehicle:', deleteErr);
      res.status(500).json({ message: 'Server error' });
    } else if (deleteResult.affectedRows === 0) {
      // No rows were affected, meaning the vehicle with the specified ID was not found
      res.status(404).json({ message: 'Vehicle not found' });
    } else {
      res.json({ message: 'Vehicle deleted successfully' });
    }
  });
});


export default router;