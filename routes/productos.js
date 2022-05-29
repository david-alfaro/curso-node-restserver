const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos');

const { existeCategoriaPorID, existeProductoPorID } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/', obtenerProductos);

//Obtener  categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos

], obtenerProducto);

//Crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], crearProducto);

//Actualizar categorias - privado
router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], actualizarProducto);

//Eliminar categorias - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], eliminarProducto);

module.exports = router;