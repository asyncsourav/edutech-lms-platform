import { configDotenv } from "dotenv"

configDotenv({});

export const ENV = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
}