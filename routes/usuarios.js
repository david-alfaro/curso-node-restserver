const {Router} = require('express');
const {usuariosGet,usuariosDelete,usuariosPut,usuariosPost} = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);




module.exports = router;