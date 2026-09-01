import pool from "../helpers/db_helper.js";
import * as repo from "../repositories/user.repository.js";
import * as Response from "../config/response.helper.js";
import bcrypt from "bcrypt";



export const register = async (payload) => {


    try {
        console.log("Before hashing payload : ", payload)

        const exists =
            await repo.findUserByEmail(
                payload.email
            );


        if (exists) {
            return Response.badRequest(
                "Email already exists"
            );
        }


        payload.password =
            await bcrypt.hash(
                payload.password,
                10
            );
        console.log("After hasiing payload : ", payload)

        const user =
            await repo.create(payload);


        return Response.success(
            user,
            "Register Success"
        );


    } catch (err) {


        return Response.internalServerError(
            err.message
        );


    }


};

export const profile = async (userId) => {
    try {


        const exists =
            await repo.findUserById(userId);


        if (!exists) {
            return Response.badRequest(
                "User not found"
            );
        }

        return Response.success(
            exists,
            "Profile fetched successfully"
        );


    } catch (err) {


        return Response.internalServerError(
            err.message
        );


    }
}


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
