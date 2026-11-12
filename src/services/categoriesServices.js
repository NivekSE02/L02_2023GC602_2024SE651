import { pool } from '../db.js';

export const getAllCategories = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categorias');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM categorias WHERE id_categoria = $1',
            [req.params.id_categoria]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategoriesByName = async (nombre_categoria) => {
    const result = await pool.query(
        'SELECT * FROM categorias WHERE nombre_categoria LIKE $1',
        [`%${nombre_categoria}%`]
    );
    return result.rows;
};

export const createCategory = async (nombre_categoria, clasificacion) => {
    const result = await pool.query(
        'INSERT INTO categorias (nombre_categoria, clasificacion) VALUES ($1, $2) RETURNING *',
        [nombre_categoria, clasificacion]
    );
    return result.rows[0];
};

export const updateCategory = async (id_categoria, nombre_categoria, clasificacion) => {
    const result = await pool.query(
        'UPDATE categorias SET nombre_categoria = $1, clasificacion = $2 WHERE id_categoria = $3 RETURNING *',
        [nombre_categoria, clasificacion, id_categoria]
    );
    if (result.rowCount === 0) throw new Error('Categoría no encontrada');
    return result.rows[0];
};

export const deleteCategory = async (id_categoria) => {
    const result = await pool.query(
        'DELETE FROM categorias WHERE id_categoria = $1 RETURNING *',
        [id_categoria]
    );
    if (result.rowCount === 0) throw new Error('Categoría no encontrada');
    return { message: 'Categoría eliminada correctamente', categoria: result.rows[0] };
};
