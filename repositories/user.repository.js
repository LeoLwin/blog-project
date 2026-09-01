import pool from "../helpers/db_helper.js";
import bcrypt from "bcrypt";



/**
* Create new user.
*/
export const create = async (payload) => {
   let connection;

   try {

       connection = await pool.getConnection();


       const [result] = await connection.query(
           `
               INSERT INTO users
               (name, email, password)
               VALUES (?, ?, ?)
           `,
           [
               payload.name,
               payload.email,
               payload.password
           ]
       );


       const [rows] = await connection.query(
           `
               SELECT
                   id,
                   name,
                   email,
                   created_at,
                   updated_at
               FROM users
               WHERE id = ?
           `,
           [result.insertId]
       );


       return rows[0];


   } catch (err) {


       console.error("create error:", err.message);
       throw err;


   } finally {


       if (connection) connection.release();


   }
};




/**
* Find user by id.
*/
export const findUserById = async (id) => {
   let connection;


   try {


       connection = await pool.getConnection();


       const [rows] = await connection.query(
           `
               SELECT
                   id,
                   name,
                   email,
                   created_at,
                   updated_at
               FROM users
               WHERE id = ?
           `,
           [Number(id)]
       );


       return rows[0] ?? null;


   } catch (err) {


       console.error("findUserById error:", err.message);
       throw err;


   } finally {


       if (connection) connection.release();


   }
};






/**
* Find user by email.
*/
export const findUserByEmail = async (email) => {
   let connection;


   try {


       connection = await pool.getConnection();


       const [rows] = await connection.query(
           `
               SELECT *
               FROM users
               WHERE email = ?
           `,
           [email]
       );


       return rows[0] ?? null;


   } catch (err) {


       console.error("findUserByEmail error:", err.message);
       throw err;


   } finally {


       if (connection) connection.release();


   }
};
