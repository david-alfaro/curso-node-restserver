const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async (req, res) =>{

    //const params = req.query;
    const {limite=5, desde=0} = req.query;
    /* const usuarios = await Usuario.find({estado:true})
        .skip(desde)
        .limit(Number(limite));
    const total = await Usuario.countDocuments({estado:true}); */

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .skip(desde)
        .limit(Number(limite))
    ])
    res.json({
        //params
        total,
        usuarios
        
    });
}

const usuariosPost = async (req, res) =>{

    

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});



    //Encriptar a contrasena

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res) =>{

    const id = req.params.id;
    const {_id,password,google,correo, ...resto} = req.body;

    //TODO validar contra BD
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        usuario
    });
}

const usuariosDelete = async (req, res) =>{

    const {id} = req.params;

    //Borramos el usuario de la BD
    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
        usuario
    });
}

module.exports= {
    usuariosGet,usuariosPost,usuariosPut,usuariosDelete
}