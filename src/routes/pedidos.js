import { Router } from 'express';
import * as pedidosControlador from '../controllers/pedidosControlador.js';
import { ejecutarValidaciones } from '../middlewares/validadores.js';
import {
    validacionesActualizarPedido,
    validacionesCrearPedido,
    validacionesIdPedido,
    validacionesIdPedidoCliente
} from '../middlewares/validaciones.js';

const router = Router();

router.get('/', pedidosControlador.getAllOrders);
router.get(
    '/cliente/:id_usuario',
    ejecutarValidaciones(validacionesIdPedidoCliente),
    pedidosControlador.getOrdersByUser
);
router.get('/:id_pedido', ejecutarValidaciones(validacionesIdPedido), pedidosControlador.getOrderById);
router.post('/', ejecutarValidaciones(validacionesCrearPedido), pedidosControlador.createOrder);
router.put(
    '/:id_pedido',
    ejecutarValidaciones(validacionesActualizarPedido),
    pedidosControlador.updateOrder
);
router.delete(
    '/:id_pedido',
    ejecutarValidaciones(validacionesIdPedido),
    pedidosControlador.deleteOrder
);

export default router;
