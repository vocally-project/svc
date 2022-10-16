import * as dotenv from "dotenv";

dotenv.config();

const configuration = {
    port: process.env.PORT,
    mongoDb: process.env.MONGODB
};

export default configuration;
