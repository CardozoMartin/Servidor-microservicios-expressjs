import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const DB = process.env.MONGO_URI || "";
export const connectDB = async()=>{
    try {
        await mongoose.connect(DB).then(()=>{
            console.log('Conectado a la base de datos 🚀');
        })
    } catch (error) {
        console.log('Error al conectar a la base de datos ✖️')
    }
}