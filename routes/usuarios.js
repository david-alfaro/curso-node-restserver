const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require("../controllers/usuarios");
const { esRoleValido, emailExiste, existeUsuarioPorID } = require("../helpers/db-validators");

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El passwprd debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos

], usuariosPost);

router.put('/:id', [
        check('id', 'No es un ID válido de mongo').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        check('rol').custom(esRoleValido),
        validarCampos
    ],
    usuariosPut);

router.patch('/', usuariosPatch);


router.delete('/:id', [
        check('id', 'No es un ID válido de mongo').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        validarCampos
    ],
    usuariosDelete);










module.exports = router;