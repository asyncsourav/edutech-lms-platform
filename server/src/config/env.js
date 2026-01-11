import { configDotenv } from "dotenv"

configDotenv({});

export const ENV = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN: process.env.ADMIN,
    CLIENT_URL: process.env.CLIENT_URL,
}