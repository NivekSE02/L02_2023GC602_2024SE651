import { Router } from 'express';
import { 
    getAllBooks, 
    getBookByYear,
    getBooksByName, 
    createBook, 
    updateBook, 
    deleteBook 
} from '../services/librosServices.js';

const router = Router();

router.get('/', getAllBooks);

router.get('/buscarPorYear/:year', getBookByYear);

router.get('/buscarPorNombre/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        const books = await getBooksByName(nombre);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { titulo, anio_publicacion, id_autor, id_categoria, resumen } = req.body;
        const book = await createBook(titulo, anio_publicacion, id_autor, id_categoria, resumen);
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id_libro', async (req, res) => {
    try {
        const { titulo, anio_publicacion, id_autor, id_categoria, resumen } = req.body;
        const { id_libro } = req.params;
        const book = [titulo, anio_publicacion, id_autor, id_categoria, resumen, id_libro];
        
        const updatedBook = await updateBook(book);
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id_libro', async (req, res) => {
    try {
        const { id_libro } = req.params;
        const result = await deleteBook(id_libro);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;