import { Router } from 'express';
import * as librosControlador from '../controllers/librosControlador.js';
import { ejecutarValidaciones } from '../middlewares/validadores.js';
import {
    validacionesActualizarLibro,
    validacionesBuscarNombre,
    validacionesBuscarYear,
    validacionesCrearLibro,
    validacionesIdLibro
} from '../middlewares/validaciones.js';

const router = Router();

router.get('/', librosControlador.getAllBooks);
router.get(
    '/buscarPorYear/:year',
    ejecutarValidaciones(validacionesBuscarYear),
    librosControlador.getBookByYear
);
router.get(
    '/buscarPorNombre/:nombre',
    ejecutarValidaciones(validacionesBuscarNombre),
    librosControlador.getBooksByName
);
router.post('/', ejecutarValidaciones(validacionesCrearLibro), librosControlador.createBook);
router.put(
    '/:id_libro',
    ejecutarValidaciones(validacionesActualizarLibro),
    librosControlador.updateBook
);
router.delete(
    '/:id_libro',
    ejecutarValidaciones(validacionesIdLibro),
    librosControlador.deleteBook
);

export default router;
