import { pool } from '../db.js';
import { crearError } from '../utils/crearError.js';

export const getAllOrders = async () => {
    const result = await pool.query('SELECT * FROM pedidos ORDER BY id_pedido');
    return result.rows;
};

export const getOrderById = async (id_pedido) => {
    const result = await pool.query(
        'SELECT * FROM pedidos WHERE id_pedido = $1',
        [id_pedido]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Pedido no encontrado.');
    }
    return result.rows[0];
};

export const getOrdersByUser = async (id_usuario) => {
    const result = await pool.query(
        'SELECT * FROM pedidos WHERE id_usuario = $1 ORDER BY id_pedido',
        [id_usuario]
    );
    return result.rows;
};

export const createOrder = async ({ id_usuario, fecha, estado }) => {
    const result = await pool.query(
        `INSERT INTO pedidos (id_usuario, fecha, estado)
         VALUES ($1, COALESCE($2::timestamp, CURRENT_TIMESTAMP), COALESCE($3, 'Pendiente'))
         RETURNING *`,
        [id_usuario, fecha || null, estado || null]
    );
    return result.rows[0];
};

export const updateOrder = async (id_pedido, { id_usuario, fecha, estado }) => {
    const result = await pool.query(
        `UPDATE pedidos
         SET id_usuario = $1, fecha = $2, estado = $3
         WHERE id_pedido = $4
         RETURNING *`,
        [id_usuario, fecha, estado, id_pedido]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Pedido no encontrado.');
    }
    return result.rows[0];
};

export const deleteOrder = async (id_pedido) => {
    const result = await pool.query(
        'DELETE FROM pedidos WHERE id_pedido = $1 RETURNING *',
        [id_pedido]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Pedido no encontrado.');
    }
    return { message: 'Pedido eliminado correctamente.', pedido: result.rows[0] };
};
