import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/usuarios.js';
import ordersRouter from './routes/pedidos.js';
import orderDetailsRouter from './routes/detallesPedidos.js';
import productsRouter from './routes/productos.js';
import { manejoErrores } from './middlewares/manejoErrores.js';


dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de pedidos funcionando correctamente.');
});

app.use('/users', usersRouter);
app.use('/pedidos', ordersRouter);
app.use('/detalles-pedidos', orderDetailsRouter);
app.use('/productos', productsRouter);

app.use(manejoErrores);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});