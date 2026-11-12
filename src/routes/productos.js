import { Router } from 'express';
import * as productosControlador from '../controllers/productosControlador.js';
import { ejecutarValidaciones } from '../middlewares/validadores.js';
import { validacionesTopProductos } from '../middlewares/validaciones.js';

const router = Router();

router.get(
    '/top-vendidos',
    ejecutarValidaciones(validacionesTopProductos),
    productosControlador.getTopSellingProducts
);

export default router;
