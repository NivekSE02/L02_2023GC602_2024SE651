import { Router } from 'express';
import {
    getAllCategories,
    getCategoryById,
    getCategoriesByName,
    createCategory,
    updateCategory,
    deleteCategory
} from '../services/categoriesServices.js';

const router = Router();

router.get('/', getAllCategories);

router.get('/buscarPorNombre/:nombre', async (req, res) => {
    try {
        const categories = await getCategoriesByName(req.params.nombre);
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id_categoria', getCategoryById);

router.post('/', async (req, res) => {
    try {
        const { nombre_categoria, clasificacion } = req.body;
        const category = await createCategory(nombre_categoria, clasificacion);
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id_categoria', async (req, res) => {
    try {
        const { nombre_categoria, clasificacion } = req.body;
        const category = await updateCategory(
            req.params.id_categoria,
            nombre_categoria,
            clasificacion
        );
        res.json(category);
    } catch (err) {
        const status = err.message === 'Categoría no encontrada' ? 404 : 500;
        res.status(status).json({ error: err.message });
    }
});

router.delete('/:id_categoria', async (req, res) => {
    try {
        const result = await deleteCategory(req.params.id_categoria);
        res.json(result);
    } catch (err) {
        const status = err.message === 'Categoría no encontrada' ? 404 : 500;
        res.status(status).json({ error: err.message });
    }
});

export default router;
