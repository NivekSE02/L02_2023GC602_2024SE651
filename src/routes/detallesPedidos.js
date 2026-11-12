import { Router } from 'express';
import * as detallesPedidosControlador from '../controllers/detallesPedidosControlador.js';
import { ejecutarValidaciones } from '../middlewares/validadores.js';
import {
    validacionesActualizarDetallePedido,
    validacionesCrearDetallePedido,
    validacionesIdDetalle,
    validacionesIdPedido,
    validacionesIdProducto
} from '../middlewares/validaciones.js';

const router = Router();

router.get('/', detallesPedidosControlador.getAllOrderDetails);
router.get(
    '/pedido/:id_pedido',
    ejecutarValidaciones(validacionesIdPedido),
    detallesPedidosControlador.getDetailsByOrder
);
router.get(
    '/producto/:id_producto',
    ejecutarValidaciones(validacionesIdProducto),
    detallesPedidosControlador.getDetailsByProduct
);
router.get(
    '/:id_detalle',
    ejecutarValidaciones(validacionesIdDetalle),
    detallesPedidosControlador.getOrderDetailById
);
router.post(
    '/',
    ejecutarValidaciones(validacionesCrearDetallePedido),
    detallesPedidosControlador.createOrderDetail
);
router.put(
    '/:id_detalle',
    ejecutarValidaciones(validacionesActualizarDetallePedido),
    detallesPedidosControlador.updateOrderDetail
);
router.delete(
    '/:id_detalle',
    ejecutarValidaciones(validacionesIdDetalle),
    detallesPedidosControlador.deleteOrderDetail
);

export default router;
