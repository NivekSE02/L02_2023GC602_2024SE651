import { pool } from '../db.js';

export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM autores');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const result = await pool.query('SELECT * FROM autores WHERE correo = $1', [email]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBuscarNombre = async (nombre) => {
    const buscar = `%${nombre}%`;
    const result = await pool.query("SELECT * FROM autores WHERE nombre LIKE $1", [buscar]);
    return result.rows;
};

export const postCrearUsuario = async (nombre, nacionalidad, biografia, correo) => {
    try {
        const query = `INSERT INTO autores (nombre, nacionalidad, biografia, correo) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(query, [nombre, nacionalidad, biografia, correo]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export const actualizarUsuario = async (usuario) => {
    const query = `UPDATE autores SET nombre=$1, nacionalidad=$2, biografia=$3, correo=$4 WHERE id_autor=$5 RETURNING *`;
    try {
        const result = await pool.query(query, usuario);
        if (result.rowCount === 0) throw new Error('Autor no encontrado');
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export const eliminarUsuario = async (id_usuario) => {
    try {
        const usuarioAEliminar = await pool.query('SELECT * FROM autores WHERE id_autor = $1', [id_usuario]);
        if (usuarioAEliminar.rowCount === 0) throw new Error('Autor no encontrado');
        
        const result = await pool.query('DELETE FROM autores WHERE id_autor = $1', [id_usuario]);
        return { message: "Autor eliminado correctamente", usuario: usuarioAEliminar.rows[0] };
    } catch (err) {
        throw new Error(err.message);
    }
};