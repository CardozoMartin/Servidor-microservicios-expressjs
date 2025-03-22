import express, { Application } from 'express';
import { errorHandler } from '../middleware/erroHandler';
import productRoutes from '../routes/productoRoutes';
import cors from 'cors'; // Add this import

export class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.handleErrors();
    }

    middlewares() { 
        // Add CORS middleware before other middleware
        this.app.use(cors({
            origin: 'http://localhost:5173', // Allow requests from your frontend origin
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
            allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
            credentials: true // If you need to send cookies or auth headers
        }));
        this.app.use(express.json());
    }

    private routes(): void { 
        this.app.use('/api', productRoutes);
    }

    private handleErrors() {
        // You might want to add the error handler middleware here
        this.app.use(errorHandler);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Microservicios de productos 🚀', this.port);
        });
    }
}