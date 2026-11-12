import * as librosServicio from '../services/librosServicios.js';

export const getAllBooks = async (req, res, next) => {
    try {
        res.json(await librosServicio.getAllBooks());
    } catch (error) {
        next(error);
    }
};

export const getBookByYear = async (req, res, next) => {
    try {
        res.json(await librosServicio.getBookByYear(req.params.year));
    } catch (error) {
        next(error);
    }
};

export const getBooksByName = async (req, res, next) => {
    try {
        res.json(await librosServicio.getBooksByName(req.params.nombre));
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    try {
        res.status(201).json(await librosServicio.createBook(req.body));
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        res.json(await librosServicio.updateBook(req.params.id_libro, req.body));
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        res.json(await librosServicio.deleteBook(req.params.id_libro));
    } catch (error) {
        next(error);
    }
};
