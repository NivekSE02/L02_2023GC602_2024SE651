import { Router } from 'express';
import * as usuariosControlador from '../controllers/usuariosControlador.js';
import { ejecutarValidaciones } from '../middlewares/validadores.js';
import {
    validacionesActualizarUsuario,
    validacionesBuscarApellido,
    validacionesBuscarCorreo,
    validacionesBuscarNombre,
    validacionesCrearUsuario,
    validacionesIdUsuario
} from '../middlewares/validaciones.js';

const router = Router();

router.get('/', usuariosControlador.getAllUsers);
router.get(
    '/buscarPorNombre/:nombre',
    ejecutarValidaciones(validacionesBuscarNombre),
    usuariosControlador.getUsersByName
);
router.get(
    '/buscarPorApellido/:apellido',
    ejecutarValidaciones(validacionesBuscarApellido),
    usuariosControlador.getUsersBySurname
);
router.get(
    '/buscarPorCorreo/:correo',
    ejecutarValidaciones(validacionesBuscarCorreo),
    usuariosControlador.getUsersByEmail
);
router.get('/:id_usuario', ejecutarValidaciones(validacionesIdUsuario), usuariosControlador.getUserById);
router.post('/', ejecutarValidaciones(validacionesCrearUsuario), usuariosControlador.createUser);
router.put(
    '/:id_usuario',
    ejecutarValidaciones([...validacionesIdUsuario, ...validacionesActualizarUsuario]),
    usuariosControlador.updateUser
);
router.delete('/:id_usuario', ejecutarValidaciones(validacionesIdUsuario), usuariosControlador.deleteUser);

export default router;
