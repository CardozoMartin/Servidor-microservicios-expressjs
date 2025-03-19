import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`📥 Solicitud recibida: ${req.method} ${req.originalUrl}`);
    console.log(`Cuerpo recibido: ${JSON.stringify(req.body)}`);
    next();
});

const services = {
    productos: process.env.PRODUCT_SERVICE || "http://localhost:3001",
    categorias: process.env.CATEGORY_SERVICE || "http://localhost:3002",
};

app.use("/productos", async (req, res) => {
    try {
        console.log(`🔀 Redirigiendo a: ${services.productos}${req.originalUrl.replace('/productos', '')}`);
        const response = await axios({
            method: req.method,
            url: `${services.productos}${req.originalUrl.replace('/productos', '')}`,
            data: req.body,
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 60000,
        });
        console.log(response)
        console.log(`📤 Respuesta del microservicio: ${response.status}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(`❌ Error al redirigir: ${error.message}`);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.get("/", (req, res) => {
    res.json({ 
        message: "API Gateway funcionando correctamente",
        servicios
    });
});

app.listen(PORT, () => {
    console.log(`🚀 API Gateway corriendo en http://localhost:${PORT}`);
});