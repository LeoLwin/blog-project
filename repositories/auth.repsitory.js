import pool from "../helpers/db_helper.js";


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
