import { body, param, query } from 'express-validator';

const enteroPositivo = (campo) => campo.trim().notEmpty().isInt({ min: 1 });
const textoRequerido = (campo) => campo.trim().notEmpty();

export const validacionesIdUsuario = [enteroPositivo(param('id_usuario'))];
export const validacionesIdPedido = [enteroPositivo(param('id_pedido'))];
export const validacionesIdDetalle = [enteroPositivo(param('id_detalle'))];
export const validacionesIdCategoria = [enteroPositivo(param('id_categoria'))];
export const validacionesIdLibro = [enteroPositivo(param('id_libro'))];
export const validacionesIdProducto = [enteroPositivo(param('id_producto'))];

export const validacionesBuscarNombre = [textoRequerido(param('nombre'))];
export const validacionesBuscarApellido = [textoRequerido(param('apellido'))];
export const validacionesBuscarCorreo = [textoRequerido(param('correo'))];

export const validacionesCrearUsuario = [
    textoRequerido(body('nombre')).withMessage('El nombre es obligatorio.'),
    textoRequerido(body('apellido')).withMessage('El apellido es obligatorio.'),
    body('correo').trim().isEmail().withMessage('El correo no es válido.')
];

export const validacionesActualizarUsuario = validacionesCrearUsuario;

export const validacionesCrearPedido = [
    enteroPositivo(body('id_usuario')).withMessage('El id_usuario debe ser un entero positivo.'),
    body('fecha').optional({ nullable: true, checkFalsy: true }).isISO8601()
        .withMessage('La fecha debe tener un formato válido.'),
    body('estado').optional({ nullable: true, checkFalsy: true }).trim().notEmpty()
        .withMessage('El estado no puede estar vacío.')
];

export const validacionesActualizarPedido = [
    enteroPositivo(param('id_pedido')),
    enteroPositivo(body('id_usuario')).withMessage('El id_usuario debe ser un entero positivo.'),
    body('fecha').isISO8601().withMessage('La fecha debe tener un formato válido.'),
    textoRequerido(body('estado')).withMessage('El estado es obligatorio.')
];

export const validacionesIdPedidoCliente = [
    enteroPositivo(param('id_usuario'))
];

export const validacionesCrearDetallePedido = [
    enteroPositivo(body('id_pedido')).withMessage('El id_pedido debe ser un entero positivo.'),
    enteroPositivo(body('id_producto')).withMessage('El id_producto debe ser un entero positivo.'),
    body('cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser un entero positivo.'),
    body('precio_unitario').isFloat({ min: 0 }).withMessage('El precio_unitario debe ser un número no negativo.')
];

export const validacionesActualizarDetallePedido = [
    enteroPositivo(param('id_detalle')),
    ...validacionesCrearDetallePedido
];

export const validacionesTopProductos = [
    query('n').custom((value) => Number.isSafeInteger(Number(value)) && Number(value) >= 1)
        .withMessage('El parámetro n debe ser un entero positivo.')
];

export const validacionesBuscarCategoria = [textoRequerido(param('nombre'))];
export const validacionesCrearCategoria = [
    textoRequerido(body('nombre_categoria')).withMessage('El nombre de la categoría es obligatorio.'),
    textoRequerido(body('clasificacion')).withMessage('La clasificación es obligatoria.')
];
export const validacionesActualizarCategoria = [
    enteroPositivo(param('id_categoria')),
    ...validacionesCrearCategoria
];

export const validacionesBuscarYear = [
    param('year').isInt().withMessage('El año debe ser un entero.')
];
export const validacionesCrearLibro = [
    textoRequerido(body('titulo')).withMessage('El título es obligatorio.'),
    body('anio_publicacion').isInt().withMessage('El año de publicación debe ser un entero.'),
    enteroPositivo(body('id_autor')).withMessage('El id_autor debe ser un entero positivo.'),
    enteroPositivo(body('id_categoria')).withMessage('El id_categoria debe ser un entero positivo.'),
    body('resumen').optional({ nullable: true }).isString()
        .withMessage('El resumen debe ser texto.')
];
export const validacionesActualizarLibro = [
    enteroPositivo(param('id_libro')),
    ...validacionesCrearLibro
];
