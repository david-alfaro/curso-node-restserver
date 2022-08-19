const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {
    //const params = req.query;
    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true }

    /*  const usuarios = await Usuario.find(query)
         .skip(Number(desde))
         .limit(Number(limite));

     const total = await Usuario.countDocuments(query) */

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        //msg: "GET-controlador",
        //params
        //usuarios
        //resp
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar si el correo existe



    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en BD

    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra BD
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    //el metodo findOneAndUpdate encuentra el elemento por el id, lo actualiza y lo devuelve actualizado
    const usuariodb = await Usuario.findOneAndUpdate(id, resto, { new: true });

    res.json({
        msg: "Put-controlador",
        usuariodb
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "Patch-controlador"
    });
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findOneAndUpdate(id, { estado: false }, { new: true });

    res.json({
        usuarioEliminado
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}