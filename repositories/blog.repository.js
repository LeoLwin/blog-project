import pool from "../helpers/db_helper.js";

/**
 * Get all blogs.
 */
export const findAll = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM blogs ORDER BY id DESC"
        );
        return rows;
    } catch (err) {
        console.error("findAll error:", err.message);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

/**
 * Get a single blog by id. Returns null if not found.
 */
export const findById = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM blogs WHERE id = ?",
            [Number(id)]
        );
        return rows[0] ?? null;
    } catch (err) {
        console.error("findById error:", err.message);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

/**
 * Create a new blog and return the created row.
 * Wrapped in a transaction — if the insert succeeds but the
 * follow-up read fails, we roll back rather than leaving things
 * in an inconsistent state.
 */
export const create = async (payload) => {
    let connection;
    console.log("Repository payload : ", payload)
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [result] = await connection.query(
            "INSERT INTO blogs (title, content, image) VALUES (?, ?, ?)",
            [payload.title, payload.content, payload.image]
        );

        const [rows] = await connection.query(
            "SELECT * FROM blogs WHERE id = ?",
            [result.insertId]
        );

        await connection.commit();
        return rows[0];
    } catch (err) {
        if (connection) await connection.rollback();
        console.error("create error:", err.message);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

/**
 * Update an existing blog. Returns null if it doesn't exist.
 */
export const update = async (id, payload) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [existingRows] = await connection.query(
            "SELECT * FROM blogs WHERE id = ?",
            [Number(id)]
        );
        const existing = existingRows[0];

        if (!existing) {
            await connection.rollback();
            return null;
        }

        const title = payload.title ?? existing.title;
        const content = payload.content ?? existing.content;

        await connection.query(
            "UPDATE blogs SET title = ?, content = ? WHERE id = ?",
            [title, content, Number(id)]
        );

        const [updatedRows] = await connection.query(
            "SELECT * FROM blogs WHERE id = ?",
            [Number(id)]
        );

        await connection.commit();
        return updatedRows[0];
    } catch (err) {
        if (connection) await connection.rollback();
        console.error("update error:", err.message);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

/**
 * Delete a blog by id. Returns the deleted row, or null if it didn't exist.
 */
export const remove = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [existingRows] = await connection.query(
            "SELECT * FROM blogs WHERE id = ?",
            [Number(id)]
        );
        const existing = existingRows[0];

        if (!existing) {
            await connection.rollback();
            return null;
        }

        await connection.query(
            "DELETE FROM blogs WHERE id = ?",
            [Number(id)]
        );

        await connection.commit();
        return existing;
    } catch (err) {
        if (connection) await connection.rollback();
        console.error("remove error:", err.message);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

export const test = ()=>{
    console.log("This is test function in blog.repository.js");
    return 
}