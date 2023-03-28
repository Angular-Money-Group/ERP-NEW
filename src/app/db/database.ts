import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Logger } from '../services/logger.service';

dotenv.config();

export const connection = () => {
    mongoose
    .connect(process.env.DB_CONNECTION!)
    .then(() => Logger.infoLog('Connected to database'))
    .catch((err) => console.log(err));
}

export default { connection };