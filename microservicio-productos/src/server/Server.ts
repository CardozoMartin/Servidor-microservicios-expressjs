import express, { Application } from 'express';
import { errorHandler } from '../middleware/erroHandler';
import productRoutes from '../routes/productoRoutes'
export class Server {
    //iniciamos las variables de la clase servidor
    private app: Application;
    private port: string;

    //inicializamos el contructor
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.handleErrors()
    }

    //iniciamos los middlewares
    middlewares() { 
        this.app.use(express.json());
    }

    //metodos de rutas
    private routes():void { 
        this.app.use('/api',productRoutes)
    }
    //manejo de errores
    private handleErrors(){
       
    }
    //iniciamos el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log('Microservicios de productos 🚀', this.port);
        })
    }

}