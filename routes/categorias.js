const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categorias');
const { existeCategoriaPorID } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener  categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos

], obtenerCategoria);

//Crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar categorias - privado
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], actualizarCategoria);

//Eliminar categorias - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], eliminarCategoria);

module.exports = router;