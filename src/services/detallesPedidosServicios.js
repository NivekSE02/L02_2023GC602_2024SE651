import { pool } from '../db.js';
import { crearError } from '../utils/crearError.js';

export const getAllOrderDetails = async () => {
    const result = await pool.query('SELECT * FROM detalles_pedidos ORDER BY id_detalle');
    return result.rows;
};

export const getOrderDetailById = async (id_detalle) => {
    const result = await pool.query(
        'SELECT * FROM detalles_pedidos WHERE id_detalle = $1',
        [id_detalle]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Detalle de pedido no encontrado.');
    }
    return result.rows[0];
};

const getDetailsByField = async (field, value) => {
    const result = await pool.query(
        `SELECT * FROM detalles_pedidos WHERE ${field} = $1 ORDER BY id_detalle`,
        [value]
    );
    return result.rows;
};

export const getDetailsByOrder = (id_pedido) =>
    getDetailsByField('id_pedido', id_pedido);

export const getDetailsByProduct = (id_producto) =>
    getDetailsByField('id_producto', id_producto);

export const createOrderDetail = async ({ id_pedido, id_producto, cantidad, precio_unitario }) => {
    const result = await pool.query(
        `INSERT INTO detalles_pedidos (id_pedido, id_producto, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [id_pedido, id_producto, cantidad, precio_unitario]
    );
    return result.rows[0];
};

export const updateOrderDetail = async (
    id_detalle,
    { id_pedido, id_producto, cantidad, precio_unitario }
) => {
    const result = await pool.query(
        `UPDATE detalles_pedidos
         SET id_pedido = $1, id_producto = $2, cantidad = $3, precio_unitario = $4
         WHERE id_detalle = $5
         RETURNING *`,
        [id_pedido, id_producto, cantidad, precio_unitario, id_detalle]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Detalle de pedido no encontrado.');
    }
    return result.rows[0];
};

export const deleteOrderDetail = async (id_detalle) => {
    const result = await pool.query(
        'DELETE FROM detalles_pedidos WHERE id_detalle = $1 RETURNING *',
        [id_detalle]
    );
    if (result.rowCount === 0) {
        throw crearError(404, 'Detalle de pedido no encontrado.');
    }
    return { message: 'Detalle eliminado correctamente.', detalle: result.rows[0] };
};
