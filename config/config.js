import * as dotenv from 'dotenv';

dotenv.config();


const config = {
 DB_HOST: process.env.DB_HOST,
 DB_PORT: process.env.DB_PORT,
 DB_USER: process.env.DB_USER,
 DB_PASSWORD: process.env.DB_PASSWORD,
 DB_NAME: process.env.DB_NAME,
 MONGO_URI: process.env.MONGO_URI,
 JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
