import * as pedidosServicio from '../services/pedidosServicios.js';

export const getAllOrders = async (req, res, next) => {
    try {
        res.json(await pedidosServicio.getAllOrders());
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        res.json(await pedidosServicio.getOrderById(req.params.id_pedido));
    } catch (error) {
        next(error);
    }
};

export const getOrdersByUser = async (req, res, next) => {
    try {
        res.json(await pedidosServicio.getOrdersByUser(req.params.id_usuario));
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (req, res, next) => {
    try {
        res.status(201).json(await pedidosServicio.createOrder(req.body));
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        res.json(await pedidosServicio.updateOrder(req.params.id_pedido, req.body));
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        res.json(await pedidosServicio.deleteOrder(req.params.id_pedido));
    } catch (error) {
        next(error);
    }
};
