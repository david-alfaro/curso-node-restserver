const {response} = require('express');

const usuariosGet = (req, res) =>{

    const params = req.query;
    res.json({
        msg:"get api - controlador",
        params
    });
}

const usuariosPost = (req, res) =>{

    const body = req.body;

    res.json({
        msg:"post api - controlador",
        body
    });
}

const usuariosPut = (req, res) =>{

    const id = req.params.id;

    res.json({
        msg:"put api - controlador",
        id
    });
}

const usuariosDelete = (req, res) =>{
    res.json({
        msg:"delete api - controlador"
    });
}

module.exports= {
    usuariosGet,usuariosPost,usuariosPut,usuariosDelete
}