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

  export default router;