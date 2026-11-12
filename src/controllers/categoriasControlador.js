import * as categoriasServicio from '../services/categoriasServicios.js';

export const getAllCategories = async (req, res, next) => {
    try {
        res.json(await categoriasServicio.getAllCategories());
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        res.json(await categoriasServicio.getCategoryById(req.params.id_categoria));
    } catch (error) {
        next(error);
    }
};

export const getCategoriesByName = async (req, res, next) => {
    try {
        res.json(await categoriasServicio.getCategoriesByName(req.params.nombre));
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        res.status(201).json(await categoriasServicio.createCategory(req.body));
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        res.json(
            await categoriasServicio.updateCategory(req.params.id_categoria, req.body)
        );
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        res.json(await categoriasServicio.deleteCategory(req.params.id_categoria));
    } catch (error) {
        next(error);
    }
};
