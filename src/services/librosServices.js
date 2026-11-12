import { pool } from '../db.js';

export const getAllBooks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM libros');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBookByYear = async (req, res) => {
    const { year } = req.params;
    try {
        const result = await pool.query('SELECT * FROM libros WHERE anio_publicacion = $1', [year]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const getBooksByName = async (nombre) => {
    const buscar = `%${nombre}%`;
    const result = await pool.query("SELECT * FROM libros WHERE titulo LIKE $1", [buscar]);
    return result.rows;
};

export const createBook = async (titulo, anio_publicacion, id_autor, id_categoria, resumen) => {
    const query = `INSERT INTO libros (titulo, anio_publicacion, id_autor, id_categoria, resumen) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const result = await pool.query(query, [titulo, anio_publicacion, id_autor, id_categoria, resumen]);
    return result.rows[0];
};

export const updateBook = async (book) => {
    const query = `UPDATE libros SET titulo=$1, anio_publicacion=$2, id_autor=$3, id_categoria=$4, resumen=$5 WHERE id_libro=$6 RETURNING *`;
    const result = await pool.query(query, book);
    if (result.rowCount === 0) throw new Error('Libro no encontrado');
    return result.rows[0];
};

export const deleteBook = async (id_libro) => {
    const result = await pool.query('DELETE FROM libros WHERE id_libro = $1 RETURNING *', [id_libro]);
    if (result.rowCount === 0) throw new Error('Libro no encontrado');
    return { message: 'Libro eliminado correctamente', libro: result.rows[0] };
};