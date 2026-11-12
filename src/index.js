import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import librosRouter from './routes/libros.js';
import categoriasRouter from './routes/categories.js';


dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola, mundo UNICAES! El servidor está funcionando correctamente.');
});

app.use('/users', usersRouter);
app.use('/categories', categoriasRouter);
app.use('/libros', librosRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});