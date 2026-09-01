import mysql from "mysql2/promise";
import config from "../config/config.js";

const pool = mysql.createPool({
    connectionLimit: 200, // tune this against your DB server's max_connections
    waitForConnections: true,
    queueLimit: 0, // 0 = unlimited queue length (watch memory usage under load)
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    dateStrings: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
});

/**
 * Verify the database connection on startup.
 * If it fails, exit the process — failing fast is safer than
 * letting the app run silently without a working DB connection.
 */
async function verifyConnection() {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.ping();
        console.log("Database connected successfully.");
    } catch (err) {
        switch (err.code) {
            case "PROTOCOL_CONNECTION_LOST":
                console.error("Database connection was closed.");
                break;
            case "ER_CON_COUNT_ERROR":
                console.error("Database has too many connections.");
                break;
            case "ECONNREFUSED":
                console.error("Database connection was refused.");
                break;
            default:
                console.error(" Database connection error:", err.message);
        }
        // Stop the process here instead of continuing without a DB
        process.exit(1);
    } finally {
        if (connection) connection.release();
    }
}

/**
 * Graceful shutdown — close the pool cleanly on SIGINT/SIGTERM
 * (important for Docker container stop/restart, PM2 restarts, etc.)
 */
async function closePool() {
    try {
        await pool.end();
        console.log("Database pool closed gracefully.");
    } catch (err) {
        console.error("Error closing database pool:", err.message);
    }
}

process.on("SIGINT", async () => {
    await closePool();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    await closePool();
    process.exit(0);
});

verifyConnection();

export default pool;

