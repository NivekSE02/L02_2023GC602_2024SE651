import * as detallesPedidosServicio from '../services/detallesPedidosServicios.js';

export const getAllOrderDetails = async (req, res, next) => {
    try {
        res.json(await detallesPedidosServicio.getAllOrderDetails());
    } catch (error) {
        next(error);
    }
};

export const getOrderDetailById = async (req, res, next) => {
    try {
        res.json(await detallesPedidosServicio.getOrderDetailById(req.params.id_detalle));
    } catch (error) {
        next(error);
    }
};

export const getDetailsByOrder = async (req, res, next) => {
    try {
        res.json(await detallesPedidosServicio.getDetailsByOrder(req.params.id_pedido));
    } catch (error) {
        next(error);
    }
};

export const getDetailsByProduct = async (req, res, next) => {
    try {
        res.json(await detallesPedidosServicio.getDetailsByProduct(req.params.id_producto));
    } catch (error) {
        next(error);
    }
};

export const createOrderDetail = async (req, res, next) => {
    try {
        res.status(201).json(await detallesPedidosServicio.createOrderDetail(req.body));
    } catch (error) {
        next(error);
    }
};

export const updateOrderDetail = async (req, res, next) => {
    try {
        res.json(
            await detallesPedidosServicio.updateOrderDetail(req.params.id_detalle, req.body)
        );
    } catch (error) {
        next(error);
    }
};

export const deleteOrderDetail = async (req, res, next) => {
    try {
        res.json(await detallesPedidosServicio.deleteOrderDetail(req.params.id_detalle));
    } catch (error) {
        next(error);
    }
};
