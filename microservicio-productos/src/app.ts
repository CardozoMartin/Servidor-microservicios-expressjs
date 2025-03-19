import dotenv from 'dotenv';
import { connectDB } from './database/db';
import { Server } from './server/Server';


const starServer = async () => {
    dotenv.config();
    await connectDB();

    const server = new Server();

    server.listen();
}

starServer();