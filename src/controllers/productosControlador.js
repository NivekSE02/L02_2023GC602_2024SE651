import * as productosServicio from '../services/productosServicios.js';

export const getTopSellingProducts = async (req, res, next) => {
    try {
        res.json(await productosServicio.getTopSellingProducts(Number(req.query.n)));
    } catch (error) {
        next(error);
    }
};
