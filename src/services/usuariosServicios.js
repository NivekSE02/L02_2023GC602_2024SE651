import { pool } from '../db.js';
import { crearError } from '../utils/crearError.js';

const getUsersByField = async (field, value) => {
    const result = await pool.query(
        `SELECT * FROM usuarios WHERE ${field} ILIKE $1 ORDER BY id_usuario`,
        [`%${value}%`]
    );
    return result.rows;
};

export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id_usuario');
    return result.rows;
};

export const getUserById = async (id_usuario) => {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE id_usuario = $1',
        [id_usuario]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Usuario no encontrado.');
    }
    return result.rows[0];
};

export const getUsersByName = (nombre) => getUsersByField('nombre', nombre);
export const getUsersBySurname = (apellido) => getUsersByField('apellido', apellido);
export const getUsersByEmail = (correo) => getUsersByField('correo', correo);

export const createUser = async ({ nombre, apellido, correo }) => {
    const result = await pool.query(
        'INSERT INTO usuarios (nombre, apellido, correo) VALUES ($1, $2, $3) RETURNING *',
        [nombre, apellido, correo]
    );
    return result.rows[0];
};

export const updateUser = async (id_usuario, { nombre, apellido, correo }) => {
    const result = await pool.query(
        `UPDATE usuarios
         SET nombre = $1, apellido = $2, correo = $3
         WHERE id_usuario = $4
         RETURNING *`,
        [nombre, apellido, correo, id_usuario]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Usuario no encontrado.');
    }
    return result.rows[0];
};

export const deleteUser = async (id_usuario) => {
    const result = await pool.query(
        'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *',
        [id_usuario]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Usuario no encontrado.');
    }
    return { message: 'Usuario eliminado correctamente.', usuario: result.rows[0] };
};
