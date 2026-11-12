import * as usuariosServicio from '../services/usuariosServicios.js';

export const getAllUsers = async (req, res, next) => {
    try {
        res.json(await usuariosServicio.getAllUsers());
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        res.json(await usuariosServicio.getUserById(req.params.id_usuario));
    } catch (error) {
        next(error);
    }
};

export const getUsersByName = async (req, res, next) => {
    try {
        res.json(await usuariosServicio.getUsersByName(req.params.nombre));
    } catch (error) {
        next(error);
    }
};

export const getUsersBySurname = async (req, res, next) => {
    try {
        res.json(await usuariosServicio.getUsersBySurname(req.params.apellido));
    } catch (error) {
        next(error);
    }
};

export const getUsersByEmail = async (req, res, next) => {
    try {
        res.json(await usuariosServicio.getUsersByEmail(req.params.correo));
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        res.status(201).json(await usuariosServicio.createUser(req.body));
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        res.json(await usuariosServicio.updateUser(req.params.id_usuario, req.body));
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        res.json(await usuariosServicio.deleteUser(req.params.id_usuario));
    } catch (error) {
        next(error);
    }
};
