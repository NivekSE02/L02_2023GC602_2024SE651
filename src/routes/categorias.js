import { Router } from 'express';
import * as categoriasControlador from '../controllers/categoriasControlador.js';
import { ejecutarValidaciones } from '../middlewares/validadores.js';
import {
    validacionesActualizarCategoria,
    validacionesBuscarCategoria,
    validacionesCrearCategoria,
    validacionesIdCategoria
} from '../middlewares/validaciones.js';

const router = Router();

router.get('/', categoriasControlador.getAllCategories);
router.get(
    '/buscarPorNombre/:nombre',
    ejecutarValidaciones(validacionesBuscarCategoria),
    categoriasControlador.getCategoriesByName
);
router.get(
    '/:id_categoria',
    ejecutarValidaciones(validacionesIdCategoria),
    categoriasControlador.getCategoryById
);
router.post('/', ejecutarValidaciones(validacionesCrearCategoria), categoriasControlador.createCategory);
router.put(
    '/:id_categoria',
    ejecutarValidaciones(validacionesActualizarCategoria),
    categoriasControlador.updateCategory
);
router.delete(
    '/:id_categoria',
    ejecutarValidaciones(validacionesIdCategoria),
    categoriasControlador.deleteCategory
);

export default router;
