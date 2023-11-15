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
  } = req.body;

  // Construct the INSERT SQL query with the pickupDropoffLocation field
  const insertQuery = `INSERT INTO vehicles (id, make, model, type, vehicle_image, seatingCapacity, transmission, gas, features, plate, description, phone, rate, deposit, dateAdded, status, pickupDropoffLocation) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Define the values to be inserted into the database, including pickupDropoffLocation
  const values = [
    userId,
    make,
    model,
    type,
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

router.get('/transactions', (req, res) => {
  const query = 'SELECT * FROM transactions';
  con.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch data:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

export default router;