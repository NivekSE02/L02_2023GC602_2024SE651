import { pool } from '../db.js';

export const getTopSellingProducts = async (n) => {
    const result = await pool.query(
        `SELECT p.nombre, SUM(dp.cantidad)::integer AS cantidad_total_vendida
         FROM detalles_pedidos dp
         JOIN productos p ON p.id_producto = dp.id_producto
         GROUP BY p.id_producto, p.nombre
         ORDER BY cantidad_total_vendida DESC, p.id_producto
         LIMIT $1`,
        [n]
    );
    return result.rows;
};
