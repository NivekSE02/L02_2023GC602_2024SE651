import { pool } from '../db.js';
import { crearError } from '../utils/crearError.js';

export const getAllBooks = async () => {
    const result = await pool.query('SELECT * FROM libros');
    return result.rows;
};

export const getBookByYear = async (year) => {
    const result = await pool.query(
        'SELECT * FROM libros WHERE anio_publicacion = $1',
        [year]
    );
    return result.rows;
};

export const getBooksByName = async (nombre) => {
    const result = await pool.query(
        'SELECT * FROM libros WHERE titulo LIKE $1',
        [`%${nombre}%`]
    );
    return result.rows;
};

export const createBook = async ({ titulo, anio_publicacion, id_autor, id_categoria, resumen }) => {
    const result = await pool.query(
        `INSERT INTO libros (titulo, anio_publicacion, id_autor, id_categoria, resumen)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [titulo, anio_publicacion, id_autor, id_categoria, resumen]
    );
    return result.rows[0];
};

export const updateBook = async (
    id_libro,
    { titulo, anio_publicacion, id_autor, id_categoria, resumen }
) => {
    const result = await pool.query(
        `UPDATE libros
         SET titulo = $1, anio_publicacion = $2, id_autor = $3, id_categoria = $4, resumen = $5
         WHERE id_libro = $6
         RETURNING *`,
        [titulo, anio_publicacion, id_autor, id_categoria, resumen, id_libro]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Libro no encontrado.');
    }
    return result.rows[0];
};

export const deleteBook = async (id_libro) => {
    const result = await pool.query(
        'DELETE FROM libros WHERE id_libro = $1 RETURNING *',
        [id_libro]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Libro no encontrado.');
    }
    return { message: 'Libro eliminado correctamente', libro: result.rows[0] };
};
