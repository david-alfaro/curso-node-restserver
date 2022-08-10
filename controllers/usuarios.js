const { response } = require("express")


const usuariosGet = (req, res = response) => {
    const params = req.query;
    res.json({
        msg: "GET-controlador",
        params
    });
}

const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: "Post-controlador",
        edad: body.edad
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: "Put-controlador",
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "Patch-controlador"
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "Delete-controlador"
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}