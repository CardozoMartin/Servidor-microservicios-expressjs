import express, { Application } from 'express';
import categoryRoutes from '../routes/categoryRoutes'
import { errorHandler } from '../middleware/erroHandler';
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
        this.app.use(express.json());
    }

    //metodos de rutas
    private routes():void { 
        this.app.use('/api', categoryRoutes)
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