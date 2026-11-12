import { pool } from '../db.js';
import { crearError } from '../utils/crearError.js';

export const getAllCategories = async () => {
    const result = await pool.query('SELECT * FROM categorias');
    return result.rows;
};

export const getCategoryById = async (id_categoria) => {
    const result = await pool.query(
        'SELECT * FROM categorias WHERE id_categoria = $1',
        [id_categoria]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Categoría no encontrada.');
    }
    return result.rows[0];
};

export const getCategoriesByName = async (nombre) => {
    const result = await pool.query(
        'SELECT * FROM categorias WHERE nombre_categoria LIKE $1',
        [`%${nombre}%`]
    );
    return result.rows;
};

export const createCategory = async ({ nombre_categoria, clasificacion }) => {
    const result = await pool.query(
        'INSERT INTO categorias (nombre_categoria, clasificacion) VALUES ($1, $2) RETURNING *',
        [nombre_categoria, clasificacion]
    );
    return result.rows[0];
};

export const updateCategory = async (id_categoria, { nombre_categoria, clasificacion }) => {
    const result = await pool.query(
        'UPDATE categorias SET nombre_categoria = $1, clasificacion = $2 WHERE id_categoria = $3 RETURNING *',
        [nombre_categoria, clasificacion, id_categoria]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Categoría no encontrada.');
    }
    return result.rows[0];
};

export const deleteCategory = async (id_categoria) => {
    const result = await pool.query(
        'DELETE FROM categorias WHERE id_categoria = $1 RETURNING *',
        [id_categoria]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Categoría no encontrada.');
    }
    return { message: 'Categoría eliminada correctamente', categoria: result.rows[0] };
};
