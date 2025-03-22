import express, { Application } from 'express';
import categoryRoutes from '../routes/categoryRoutes'
import { errorHandler } from '../middleware/erroHandler';
import cors from 'cors'
export class Server {
    //iniciamos las variables de la clase servidor
    private app: Application;
    private port: string;

    //inicializamos el contructor
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3002';
        this.middlewares();
        this.routes();
        this.handleErrors()
    }

    //iniciamos los middlewares
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

    //metodos de rutas
    private routes():void { 
        this.app.use('/api/category', categoryRoutes)
    }
    //manejo de errores
    private handleErrors(){
        this.app.use(errorHandler)
    }
    //iniciamos el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('Microservicios de categoria 🚀', this.port);
        })
    }

}