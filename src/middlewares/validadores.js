import { validationResult } from 'express-validator';

export const ejecutarValidaciones = (validaciones) => async (req, res, next) => {
    for (const validacion of validaciones) {
        await validacion.run(req);
    }

    const errores = validationResult(req);
    if (errores.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        status: 'error',
        errors: errores.array()
    });
};
